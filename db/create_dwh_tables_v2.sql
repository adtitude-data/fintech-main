-------------------------
-- Create entity table
-------------------------
DROP TABLE IF EXISTS [dwh].[dim_entity];
CREATE TABLE [dwh].[dim_entity](
	[entityID] [int] IDENTITY(1,1) PRIMARY KEY,
	[entityName] [varchar](255) NOT NULL,
    plaidInsID [varchar](255) NOT NULL,
	[startDate] [datetime] NOT NULL,
	[currentFlag] [int] NOT NULL
) ON [PRIMARY];

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
CREATE TABLE dwh.map_entityClientRelation (
  entityClientRelationID INT IDENTITY(1,1) PRIMARY KEY,
  entityID INT NOT NULL,
  clientID INT NOT NULL,
  share INT NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1,
  CONSTRAINT map_entityClientRelation_uk UNIQUE (entityID, clientID),
  CONSTRAINT fk_entityMapping FOREIGN KEY (entityID) REFERENCES dwh.dim_entity (entityID),
  CONSTRAINT fk_clientMapping FOREIGN KEY (clientID) REFERENCES dbo.app_users (id));

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
