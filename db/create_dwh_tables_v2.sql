-------------------------
-- Create institution table
-------------------------
DROP TABLE IF EXISTS [dwh].[dim_institution];
CREATE TABLE [dwh].[dim_institution](
	[entityID] [int] IDENTITY(1,1) PRIMARY KEY,
	[entityName] [varchar](255) NOT NULL,
    plaidInsID [varchar](255) NOT NULL,
	[startDate] [datetime] NOT NULL,
	[currentFlag] [int] NOT NULL
) ON [PRIMARY];

-------------------------
-- Create entity table
-------------------------
DROP TABLE IF EXISTS [dwh].[dim_entity];
CREATE TABLE [dwh].[dim_entity](
	[entityID] [int] NOT NULL,
	[entityName] [varchar](255) NOT NULL,
	[startDate] [datetime] NOT NULL,
	[currentFlag] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dwh].[dim_entity] ADD PRIMARY KEY CLUSTERED 
(
	[entityID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dwh].[dim_entity] ADD  DEFAULT ((1)) FOR [currentFlag]
GO

-------------------------
-- Create client table
-------------------------
DROP TABLE IF EXISTS dwh.dim_client;
CREATE TABLE dwh.dim_client (
  clientID [int] IDENTITY(1,1) PRIMARY KEY,
  userID [int] NOT NULL,
  clientName VARCHAR(45) NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1
) ON [PRIMARY];

-- -----------------------------------------------------
-- Create entity client relationship table
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.map_entityClientRelation;
CREATE TABLE [dwh].[map_entityClientRelation](
	[entityClientRelationID] [int] IDENTITY(1,1) NOT NULL,
	[entityID] [int] NOT NULL,
	[clientID] [int] NOT NULL,
	[share] [int] NOT NULL,
	[startDate] [datetime] NOT NULL,
	[currentFlag] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dwh].[map_entityClientRelation] ADD PRIMARY KEY CLUSTERED 
(
	[entityClientRelationID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dwh].[map_entityClientRelation] ADD  CONSTRAINT [map_entityClientRelation_uk] UNIQUE NONCLUSTERED 
(
	[entityID] ASC,
	[clientID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dwh].[map_entityClientRelation] ADD  DEFAULT ((1)) FOR [currentFlag]
GO
ALTER TABLE [dwh].[map_entityClientRelation]  WITH CHECK ADD  CONSTRAINT [fk_clientMapping] FOREIGN KEY([clientID])
REFERENCES [dbo].[dim_client] ([clientID])
GO
ALTER TABLE [dwh].[map_entityClientRelation] CHECK CONSTRAINT [fk_clientMapping]
GO
ALTER TABLE [dwh].[map_entityClientRelation]  WITH CHECK ADD  CONSTRAINT [fk_entityMapping] FOREIGN KEY([entityID])
REFERENCES [dwh].[dim_entity] ([entityID])
GO
ALTER TABLE [dwh].[map_entityClientRelation] CHECK CONSTRAINT [fk_entityMapping]
GO

-- -----------------------------------------------------
-- Create account table
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_account;
CREATE TABLE dwh.dim_account (
  accountID INT IDENTITY(1,1) PRIMARY KEY,
  entityID INT NULL,
  accountName VARCHAR(255) NOT NULL,
  accountDescription VARCHAR(255) NULL,
  accountType VARCHAR(255) NOT NULL,
  accountSubType VARCHAR(255) NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1);
  
-------------------------
-- Create investments table
-------------------------
DROP TABLE IF EXISTS [dwh].[dim_investment];
CREATE TABLE [dwh].[dim_investment](
    investmentID INT IDENTITY(1,1) PRIMARY KEY,
    accountID INT,
    clientID INT, 
    institutionID INT, -- FK
    investmentType VARCHAR(55),
    securityName VARCHAR(255),
    securityType VARCHAR(255),
    tickerSymbol VARCHAR(55),
    isCashEquivalentFlag INT,
    costBasis DECIMAL(10,2),
    closingPrice DECIMAL(20,5),
    closingPriceAsOfDate DATE,
    institutionPrice DECIMAL(20,5),
    institutionPriceAsOf DATE,
    institutionValue DECIMAL(20,5),
    currencyCode VARCHAR(55),
    isin VARCHAR(55),
    quantity DECIMAL(25,8),
    startDate DATETIMEOFFSET(7)
) ON [PRIMARY];

ALTER TABLE [dwh].[dim_investment] WITH CHECK ADD  CONSTRAINT [fk_accountID] FOREIGN KEY([accountID]) REFERENCES [dwh].[dim_account] ([accountID])
ALTER TABLE [dwh].[dim_investment] WITH CHECK ADD  CONSTRAINT [fk_clientID] FOREIGN KEY([clientID]) REFERENCES [dwh].[dim_client] ([clientID])
ALTER TABLE [dwh].[dim_investment] WITH CHECK ADD  CONSTRAINT [fk_institutionID] FOREIGN KEY([institutionID]) REFERENCES [dwh].[dim_institution] ([entityID])

-- -----------------------------------------------------
-- Create holdings table
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.fact_holdings
CREATE TABLE dwh.fact_holdings (
  holdingID INT IDENTITY(1,1) PRIMARY KEY,
  accountID INT NOT NULL,
  clientID INT NOT NULL,
  costBasis VARCHAR(55) NOT NULL,
  institutionPrice VARCHAR(55) NOT NULL,
  institutionPriceAsOf VARCHAR(55) NULL,
  institutionValue VARCHAR(55) NOT NULL,
  isoCurrencyCode VARCHAR(55) NOT NULL,
  quantity VARCHAR(55) NOT NULL,
  startDate DATETIME NOT NULL)

-- -----------------------------------------------------
-- Create balance table
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.fact_balance ;
CREATE TABLE dwh.fact_balance (
  balanceID INT IDENTITY(1,1) PRIMARY KEY,
  accountID INT NOT NULL,
  entityClientRelationID INT NOT NULL,
  balanceAvailable VARCHAR(55) NULL,
  balanceCurrent VARCHAR(55) NULL,
  currencyCode VARCHAR(55) NULL,
  balanceLimit VARCHAR(55) NULL,
  staticComponent BIGINT NULL,
  startDate DATE NOT NULL)
