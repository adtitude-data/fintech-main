CREATE PROCEDURE [archive].[v1_populateDWH]
AS

-------------------------
-- Populate account table
-------------------------
INSERT INTO [dwh].[dim_account](accountName, assetID, entityClientRelationID, startDate, currentFlag)
SELECT 
    [entity&account] AS accountName,
    ass.assetID AS assetID,
    ecr.entityClientRelationID AS entityClientRelationID,
    GETDATE() AS startDate,
    1 AS currentFlag
FROM landing.tbl_asset_by_brokerage_fund_ash src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
ORDER BY accountName

-------------------------
-- Populate time table
-------------------------
INSERT INTO [dwh].[dim_time](dayNumberInMonth, [month], quarter, [year], weekdayFlag, lastDayInMonthFlag)
SELECT 
    DATEPART(DAY, convert(date, replace(column_name, '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace(column_name, '_', ' '))) as [month],
    DATEPART(QUARTER, convert(date, replace(column_name, '_', ' '))) as [quarter],
    DATEPART(YEAR, convert(date, replace(column_name, '_', ' '))) as [year],
    CASE WHEN DATENAME(WEEKDAY, convert(date, replace(column_name, '_', ' '))) NOT LIKE 'S%day' THEN 1 ELSE 0 END as weekDayFlag,
    CASE WHEN EOMONTH(convert(date, replace(column_name, '_', ' '))) = convert(date, replace(column_name, '_', ' ')) THEN 1 ELSE 0 END as lastDayInMonthFlag
FROM INFORMATION_SCHEMA.columns 
WHERE table_name = 'tbl_asset_by_brokerage_fund_ash' AND column_name LIKE '%20%'

-------------------------
-- Populate balance table
-------------------------
-- create temp table
CREATE TABLE #temp (timeID INT, accountID INT, balance VARCHAR(255));

-- grab data for Dec 2020
WITH mon1 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('dec_31_2020', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('dec_31_2020', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('dec_31_2020', '_', ' '))) as [year],
    dec_31_2020
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor1 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon1 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

-- grab data for Jan 2021
mon2 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('jan_31_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('jan_31_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('jan_31_2021', '_', ' '))) as [year],
    jan_31_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor2 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon2 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

-- grab data for Feb 2021
mon3 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('feb_28_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('feb_28_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('feb_28_2021', '_', ' '))) as [year],
    feb_28_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor3 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon3 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

-- grab data for Mar 2021
mon4 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('mar_31_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('mar_31_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('mar_31_2021', '_', ' '))) as [year],
    mar_31_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor4 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon4 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

-- grab data for Apr 2021
mon5 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('apr_30_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('apr_30_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('apr_30_2021', '_', ' '))) as [year],
    apr_30_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor5 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon5 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

-- grab data for May 2021
mon6 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('may_31_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('may_31_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('may_31_2021', '_', ' '))) as [year],
    may_31_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor6 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon6 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

mon7 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('jun_30_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('jun_30_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('jun_30_2021', '_', ' '))) as [year],
    jun_30_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor7 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon7 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

-- grab data for Jul 2021
mon8 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('jul_31_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('jul_31_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('jul_31_2021', '_', ' '))) as [year],
    jul_31_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor8 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon8 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
),

-- grab data for Aug 2021
mon9 AS (
SELECT 
    a.accountID AS accountID,
    DATEPART(DAY, convert(date, replace('aug_31_2021', '_', ' '))) as [dayNumberInMonth],
    DATEPART(MONTH, convert(date, replace('aug_31_2021', '_', ' '))) as [month],
    DATEPART(YEAR, convert(date, replace('aug_31_2021', '_', ' '))) as [year],
    aug_31_2021
FROM [landing].[tbl_asset_by_brokerage_fund_ash] src
INNER JOIN [dwh].[dim_assetClass] ac ON src.asset_class = ac.asset
INNER JOIN [dwh].[dim_asset] ass ON ac.assetClassID = ass.assetClassID AND src.brokerage_fund = ass.assetName
INNER JOIN [dwh].[dim_entity] ent ON src.entity_name = ent.entityName
LEFT JOIN [dwh].[dim_client] c ON src.entity_name = c.clientName
LEFT JOIN [dwh].[map_entityClientRelation] ecr ON c.clientID = ecr.clientID AND ent.entityID = ecr.entityID
LEFT JOIN [dwh].[dim_account] a ON ass.assetID = a.assetID AND ecr.entityClientRelationID = a.entityclientRelationID AND src.[entity&account] = a.accountName
),

determinedTimeIDFor9 AS (
SELECT distinct t.[timeID], t.[year], t.[month], t.dayNumberInMonth from mon9 a 
INNER JOIN dwh.dim_time t 
ON t.[month] = a.[month] AND t.[year] = a.[year] AND t.dayNumberInMonth = a.dayNumberInMonth
)

-- grab data
INSERT INTO #temp (timeID, accountID, balance)
SELECT 
    dt.timeID, a.accountID, dec_31_2020 AS balance 
FROM mon1 a 
INNER JOIN determinedTimeIDFor1 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, jan_31_2021 AS balance 
FROM mon2 a 
INNER JOIN determinedTimeIDFor2 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, feb_28_2021 AS balance 
FROM mon3 a 
INNER JOIN determinedTimeIDFor3 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, mar_31_2021 AS balance 
FROM mon4 a 
INNER JOIN determinedTimeIDFor4 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, apr_30_2021 AS balance 
FROM mon5 a 
INNER JOIN determinedTimeIDFor5 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, may_31_2021 AS balance 
FROM mon6 a 
INNER JOIN determinedTimeIDFor6 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, jun_30_2021 AS balance 
FROM mon7 a 
INNER JOIN determinedTimeIDFor7 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, jul_31_2021 AS balance 
FROM mon8 a 
INNER JOIN determinedTimeIDFor8 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

UNION ALL

SELECT 
    dt.timeID, a.accountID, aug_31_2021 AS balance 
FROM mon9 a 
INNER JOIN determinedTimeIDFor9 dt ON a.[month] = dt.[month] AND a.[year] = dt.[year] AND a.dayNumberInMonth = dt.dayNumberInMonth

-- populate fact_balances table
INSERT INTO dwh.fact_balance (timeID, accountID, balance)
select timeID, accountID, ISNULL(balance, 0) from #temp 
