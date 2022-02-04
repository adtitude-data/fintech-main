SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dwh].[v3_populateDWH]
AS

-------------------------
-- Populate institution table
-------------------------
INSERT INTO dwh.dim_institution (instName, plaidInsID, recordCreatedDate)
SELECT 
    [name] AS institutionName, 
    institution_id AS plaidInsID,
    created_at AS recordCreatedDate
FROM [dbo].[plaid_institutions] pi
LEFT OUTER JOIN dwh.dim_institution inst 
ON inst.instName = pi.[name]
WHERE inst.instName IS NULL

-------------------------
-- Populate client table
-------------------------
INSERT INTO dwh.dim_client
SELECT 
    au.id AS userID,
    au.fullname AS clientName,
    au.created_at AS recordCreatedDate
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
    au.created_at AS recordCreatedDate
FROM app_users au
LEFT JOIN dwh.dim_entity ent
ON ent.entityName = au.fullname
WHERE au.[role] = 'Client' AND ent.entityName IS NULL

-------------------------
-- Populate entity & client relationship table
-------------------------
INSERT INTO dwh.map_entityClientRelation (entityID, clientID, share, recordCreatedDate)
SELECT 
    ent.entityID AS entityID, 
    cli.clientID AS clientID, 
    100 AS share,
    ent.recordCreatedDate AS recordCreatedDate
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
    inst.instID,
    bal.b_name AS accountName,
    bal.b_mask AS accountMask,
    bal.b_official_name AS accountDescription,
    bal.b_type AS accountType,
    bal.b_subtype AS accountSubType,
    CAST(GETDATE() AS DATE) AS recordCreatedDate
FROM [dbo].[plaid_balance] bal
INNER JOIN dwh.dim_institution inst
ON bal.b_institution_id = inst.plaidInsID
LEFT JOIN dwh.dim_account acc 
ON inst.instID = acc.institutionID AND bal.b_name = acc.accountName AND bal.b_type = acc.accountType 
WHERE acc.accountName IS NULL AND acc.accountType IS NULL 
GROUP BY inst.instID, bal.b_name, bal.b_mask, bal.b_official_name, bal.b_type, bal.b_subtype
    UNION
SELECT 
    inst.instID,
    sec.s_name AS accountName,
    '' AS accountMask,
    sec.s_ticker_symbol AS accountDescription,
    sec.s_type AS accountType,
    'Securities' AS accountSubType,
    CAST(GETDATE() AS DATE) AS recordCreatedDate
FROM [dbo].[plaid_investments_securities] sec
LEFT JOIN dwh.dim_institution inst
ON sec.s_institution_id = inst.plaidInsID
LEFT JOIN dwh.dim_account acc 
ON acc.accountName = sec.s_name 
WHERE acc.accountName IS NULL AND acc.accountType IS NULL AND acc.accountSubType IS NULL
GROUP BY inst.instID, sec.s_name, sec.s_ticker_symbol, sec.s_type

-------------------------
-- Populate balance table
-------------------------
DROP TABLE IF EXISTS #temp_balance

SELECT 
    acc.accountID AS accountID, 
    bal.b_name AS accountName,
    bal.b_mask AS accountMask,
    ecr.entityClientRelationID AS entityClientRelationID,
    bal.b_blanace_available AS balanceAvailable,
    bal.b_blanace_current AS balanceCurrent,
    bal.b_blanace_iso_currency_code AS currencyCode,
    bal.b_blanace_limit AS balanceLimit,
    CAST(bal.created_at AS DATE) AS recordCreatedDate
INTO #temp_balance
FROM [dbo].[plaid_balance] bal
INNER JOIN dwh.dim_institution inst
ON bal.b_institution_id = inst.plaidInsID
INNER JOIN dwh.map_entityClientRelation ecr 
ON bal.b_institution_ID = ecr.entityID AND bal.client_id = ecr.clientID
INNER JOIN dwh.dim_account acc 
ON bal.b_name = acc.accountName AND bal.b_type = acc.accountType AND ecr.entityID = acc.institutionID

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
    bal.recordCreatedDate = tbal.recordCreatedDate 
)
GO
