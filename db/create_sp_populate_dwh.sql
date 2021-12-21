CREATE PROCEDURE populateDWH
AS

-------------------------
-- Populate entity table
-------------------------
INSERT INTO dwh.dim_entity
SELECT 
    [name] AS entityName, 
    institution_id AS plaidInsID,
    created_at AS startDate, 
    1 AS currentFlag
FROM [dbo].[plaid_institutions] pi
LEFT OUTER JOIN dwh.dim_entity ent 
ON ent.entityName = pi.[name]
WHERE ent.entityName IS NULL

-------------------------
-- Populate client table
-------------------------
INSERT INTO dwh.dim_client
SELECT 
    au.id AS userID,
    au.fullname AS clientName,
    au.created_at AS startDate,
    1 AS currentFlag
FROM app_users au
LEFT JOIN dwh.dim_client cli
ON cli.clientName = au.fullname
WHERE au.[role] = 'Client' AND cli.clientName IS NULL

-------------------------
-- Populate entity & client relationship table
-------------------------
INSERT INTO dwh.map_entityClientRelation (entityID, clientID, share, startDate, currentFlag)
SELECT 
    ent.entityID AS entityID, usr.id AS clientID, 100 AS share, GETDATE() AS startDate, 1 AS currentFlag
FROM app_accounts_token aat
INNER JOIN dwh.dim_entity ent
ON aat.account_name = ent.entityName
INNER JOIN dbo.app_users usr
ON usr.id = aat.client_id
LEFT JOIN dwh.map_entityClientRelation ecr
ON ecr.entityID = ent.entityID AND ecr.clientID = usr.id
WHERE ecr.entityID IS NULL AND ecr.clientID IS NULL

-------------------------
-- Populate account table - dupes added
-------------------------
INSERT INTO dwh.dim_account
SELECT 
    e.entityID,
    bal.b_name AS accountName,
    bal.b_official_name AS accountDescription,
    bal.b_type AS accountType,
    bal.b_subtype AS accountSubType,
    CAST(GETDATE() AS DATE) AS startDate,
    1 AS currentFlag
FROM [dbo].[plaid_balance] bal
INNER JOIN dwh.dim_entity e
ON bal.b_institution_id = e.plaidInsID
LEFT JOIN dwh.dim_account acc 
ON e.entityID = acc.entityID AND bal.b_name = acc.accountName AND bal.b_type = acc.accountType 
WHERE acc.accountName IS NULL AND acc.accountType IS NULL 
GROUP BY e.entityID, bal.b_name, bal.b_official_name, bal.b_type, bal.b_subtype
    UNION
SELECT 
    e.entityID,
    sec.s_name AS accountName,
    sec.s_ticker_symbol AS accountDescription,
    sec.s_type AS accountType,
    'Securities' AS accountSubType,
    CAST(GETDATE() AS DATE) AS startDate,
    1 AS currentFlag
FROM [dbo].[plaid_investments_securities] sec
LEFT JOIN dwh.dim_entity e
ON sec.s_institution_id = e.plaidInsID
LEFT JOIN dwh.dim_account acc 
ON acc.accountName = sec.s_name 
WHERE acc.accountName IS NULL AND acc.accountType IS NULL AND acc.accountSubType IS NULL
GROUP BY e.entityID, sec.s_name, sec.s_ticker_symbol, sec.s_type

-------------------------
-- Populate holdings table
-------------------------
INSERT INTO dwh.fact_holdings
SELECT  
    acc.accountID AS accountID,
    h.client_id AS clientID,
    h.h_cost_basis AS costBasis,
    h.h_institution_price AS institutionPrice,
    h.h_institution_price_as_of AS institutionPriceAsOf,
    h.h_institution_value AS institutionValue,
    h.h_iso_currency_code AS isoCurrencyCode,
    h.h_quantity AS quantity,
    CAST(h.created_at AS DATE) AS startDate
FROM [dbo].[plaid_investments_holdings] h
JOIN [dbo].[plaid_balance] bal
ON h.h_account_id = bal.b_account_id
JOIN dwh.dim_account acc 
ON bal.b_name = acc.accountName AND bal.b_type = acc.accountType 
LEFT OUTER JOIN dwh.fact_holdings hold 
ON h.client_id = hold.clientID AND acc.accountID = hold.accountID AND h.h_cost_basis = hold.costBasis 
AND h.h_institution_price = hold.institutionPrice AND h.h_institution_value = hold.institutionValue
AND h.h_quantity = hold.quantity AND CAST(h.created_at AS DATE) = hold.startDate
WHERE 
hold.clientID IS NULL AND hold.accountID IS NULL AND hold.costBasis IS NULL 
AND hold.institutionPrice IS NULL AND hold.institutionValue IS NULL 
AND hold.quantity IS NULL AND hold.startDate IS NULL 

-------------------------
-- Populate balance table
-------------------------
DROP TABLE IF EXISTS #temp_balance

SELECT 
    acc.accountID AS accountID, 
    ecr.entityClientRelationID AS entityClientRelationID,
    bal.b_blanace_available AS balanceAvailable,
    bal.b_blanace_current AS balanceCurrent,
    bal.b_blanace_iso_currency_code AS currencyCode,
    bal.b_blanace_limit AS balanceLimit,
    NULL AS staticComponent,
    CAST(bal.created_at AS DATE) AS startDate
INTO #temp_balance
FROM [dbo].[plaid_balance] bal
INNER JOIN dwh.dim_entity ent
ON bal.b_institution_id = ent.plaidInsID
INNER JOIN dwh.map_entityClientRelation ecr 
ON ent.entityID = ecr.entityID AND bal.client_id = ecr.clientID
INNER JOIN dwh.dim_account acc 
ON bal.b_name = acc.accountName AND bal.b_type = acc.accountType AND ecr.entityID = acc.entityID

INSERT INTO dwh.fact_balance
SELECT tbal.*
FROM #temp_balance tbal
WHERE NOT EXISTS 
(
    SELECT 1 
    FROM dwh.fact_balance bal WHERE
    bal.accountID = tbal.accountID AND
    bal.entityClientRelationID = tbal.entityClientRelationID AND
    bal.balanceCurrent = tbal.balanceCurrent AND
    bal.startDate = tbal.startDate 
)
