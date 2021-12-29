CREATE PROCEDURE [dwh].[v2_populateDWH]
AS

-------------------------
-- Populate institution table
-------------------------
INSERT INTO dwh.dim_institution
SELECT 
    [name] AS entityName, 
    institution_id AS plaidInsID,
    created_at AS startDate, 
    1 AS currentFlag
FROM [dbo].[plaid_institutions] pi
LEFT OUTER JOIN dwh.dim_institution ent 
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
-- Populate entity table
-------------------------
INSERT INTO dwh.dim_entity
SELECT 
    au.id AS userID,
    au.fullname AS entityName,
    au.created_at AS startDate,
    1 AS currentFlag
FROM app_users au
LEFT JOIN dwh.dim_entity ent
ON ent.entityName = au.fullname
WHERE au.[role] = 'Client' AND ent.entityName IS NULL

-------------------------
-- Populate entity & client relationship table
-------------------------
INSERT INTO dwh.map_entityClientRelation (entityID, clientID, share, startDate, currentFlag)
SELECT 
    ent.entityID AS entityID, 
    cli.clientID AS clientID, 
    100 AS share,
    ent.startDate AS startDate,
    1 AS currentFlag
FROM dwh.dim_client cli 
INNER JOIN dwh.dim_entity ent 
ON cli.userID = ent.entityID
LEFT JOIN dwh.map_entityClientRelation ecr 
ON cli.clientID = ecr.clientID AND ent.entityID = ecr.entityID
WHERE ecr.clientID IS NULL AND ecr.entityID IS NULL

-------------------------
-- Populate account table
-------------------------
INSERT INTO dwh.dim_account
SELECT 
    inst.entityID,
    bal.b_name AS accountName,
    bal.b_official_name AS accountDescription,
    bal.b_type AS accountType,
    bal.b_subtype AS accountSubType,
    CAST(GETDATE() AS DATE) AS startDate,
    1 AS currentFlag
FROM [dbo].[plaid_balance] bal
INNER JOIN dwh.dim_institution inst
ON bal.b_institution_id = inst.plaidInsID
LEFT JOIN dwh.dim_account acc 
ON inst.entityID = acc.entityID AND bal.b_name = acc.accountName AND bal.b_type = acc.accountType 
WHERE acc.accountName IS NULL AND acc.accountType IS NULL 
GROUP BY inst.entityID, bal.b_name, bal.b_official_name, bal.b_type, bal.b_subtype
    UNION
SELECT 
    inst.entityID,
    sec.s_name AS accountName,
    sec.s_ticker_symbol AS accountDescription,
    sec.s_type AS accountType,
    'Securities' AS accountSubType,
    CAST(GETDATE() AS DATE) AS startDate,
    1 AS currentFlag
FROM [dbo].[plaid_investments_securities] sec
LEFT JOIN dwh.dim_institution inst
ON sec.s_institution_id = inst.plaidInsID
LEFT JOIN dwh.dim_account acc 
ON acc.accountName = sec.s_name 
WHERE acc.accountName IS NULL AND acc.accountType IS NULL AND acc.accountSubType IS NULL
GROUP BY inst.entityID, sec.s_name, sec.s_ticker_symbol, sec.s_type

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
INNER JOIN dwh.dim_institution inst
ON bal.b_institution_id = inst.plaidInsID
INNER JOIN dwh.map_entityClientRelation ecr 
ON inst.entityID = ecr.entityID AND bal.client_id = ecr.clientID
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

-------------------------
-- Populate investments table
-------------------------
INSERT INTO dwh.fact_investment
SELECT
    h.account_id AS accountID, 
    NULL AS clientID,
    NULL AS institutionID,
    'Holding' AS investmentType,
    NULL AS securityName,
    NULL AS securityType,
    NULL AS tickerSymbol,
    NULL AS isCashEquivalentFlag,
    h.h_cost_basis AS costBasis,  
    NULL AS closingPrice,
    NULL AS closingPriceAsOfDate,
    h.h_institution_price AS institutionPrice, 
    h.h_institution_price_as_of AS institutionPriceAsOf, 
    h.h_institution_value AS institutionValue, 
    h.h_iso_currency_code AS currencyCode, 
    NULL AS isin,
    h.[h_quantity] AS quantity,
    h.[created_at] AS startDate
FROM plaid_investments_holdings h
LEFT JOIN dwh.fact_investment inv 
ON h.account_id = inv.accountID AND h.h_cost_basis = inv.costBasis AND h.h_institution_price = inv.institutionPrice AND h.h_institution_value = inv.institutionValue AND h.created_at = inv.startDate
WHERE inv.accountID IS NULL AND inv.costBasis IS NULL AND inv.institutionPrice IS NULL AND inv.institutionValue IS NULL AND inv.startDate IS NULL
    UNION ALL
SELECT
    s.account_id AS accountID,
    --s.[client_id] AS clientID,
    cli.clientID AS clientID,
    inst.entityID AS institutionID,
    'Security' AS investmentType,
    s.[s_name] AS securityName,
    s.[s_type] AS securityType,
    CASE WHEN s.[s_ticker_symbol] IS NULL THEN 'Unknown' ELSE s.[s_ticker_symbol] END AS tickerSymbol,
    s.[s_is_cash_equivalent] AS isCashEquivalentFlag,
    NULL AS costBasis,
    s.[s_close_price] AS closingPrice,
    s.[s_close_price_as_of] AS closingPriceAsOfDate,
    NULL AS institutionPrice, 
    NULL AS institutionPriceAsOf, 
    NULL AS institutionValue,
    s.[s_iso_currency_code] AS currencyCode,
    s.[s_isin] AS isin,
    NULL AS quantity,
    s.[created_at] AS startDate
FROM plaid_investments_securities s
LEFT JOIN dwh.dim_institution inst 
ON s.s_institution_id = inst.plaidInsID
LEFT JOIN dwh.dim_client cli 
ON s.client_id = cli.userID
LEFT JOIN dwh.fact_investment inv 
ON s.account_id = inv.accountID AND cli.clientID = inv.clientID AND s.s_name = inv.securityName AND s.s_type = inv.securityType AND ISNULL(s.s_ticker_symbol, 'Unknown') = inv.tickerSymbol AND s.created_at = inv.startDate
WHERE inv.accountID IS NULL AND inv.clientID IS NULL AND inv.securityName IS NULL AND inv.securityType IS NULL AND inv.tickerSymbol IS NULL AND inv.startDate IS NULL
