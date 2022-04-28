-- -----------------------------------------------------
-- Schema dwh
-- -----------------------------------------------------
IF NOT EXISTS ( SELECT  *
                FROM    sys.schemas
                WHERE   name = N'dwh' )
    EXEC('CREATE SCHEMA [dwh]');
GO

-- -----------------------------------------------------
-- Table dwh.dim_assetClass
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_assetClass ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='dim_assetClass' AND xtype='U')
CREATE TABLE dwh.dim_assetClass (
  assetClassID INT NOT NULL,
  asset VARCHAR(255) NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1,
  PRIMARY KEY (assetClassID));
CREATE UNIQUE INDEX entity_UNIQUE ON dwh.dim_assetClass (asset ASC) 

-- -----------------------------------------------------
-- Table dwh.dim_asset
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_asset ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='dim_asset' AND xtype='U')
CREATE TABLE dwh.dim_asset (
  assetID INT NOT NULL,
  assetName VARCHAR(255) NOT NULL,
  assetClassID INT NOT NULL,
  [cash&EquivFlag] INT NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1,
  PRIMARY KEY (assetID),
  CONSTRAINT fk_assetClass FOREIGN KEY (assetClassID) REFERENCES dwh.dim_assetClass (assetClassID));
CREATE INDEX fk_assetClass_idx ON dwh.dim_asset (assetClassID ASC);

-- -----------------------------------------------------
-- Table dwh.dim_entity
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_entity ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='dim_entity' AND xtype='U')
CREATE TABLE dwh.dim_entity (
  entityID INT NOT NULL,
  entityName VARCHAR(255) NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1,
  PRIMARY KEY (entityID));

-- -----------------------------------------------------
-- Table dwh.dim_client
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_client ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='dim_client' AND xtype='U')
CREATE TABLE dwh.dim_client (
  clientID INT NOT NULL,
  clientName VARCHAR(45) NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1,
  PRIMARY KEY (clientID));
  
-- -----------------------------------------------------
-- Table dwh.map_entityClientRelation
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.map_entityClientRelation ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='map_entityClientRelation' AND xtype='U')
CREATE TABLE dwh.map_entityClientRelation (
  entityClientRelationID INT NOT NULL,
  entityID INT NOT NULL,
  clientID INT NOT NULL,
  share INT NOT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1,
  PRIMARY KEY (entityClientRelationID),
  CONSTRAINT map_entityClientRelation_uk UNIQUE (entityID, clientID),
  CONSTRAINT fk_entityMapping FOREIGN KEY (entityID) REFERENCES dwh.dim_entity (entityID),
  CONSTRAINT fk_clientMapping FOREIGN KEY (clientID) REFERENCES dwh.dim_client (clientID));

-- -----------------------------------------------------
-- Table dwh.dim_account
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_account ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='dim_account' AND xtype='U')
CREATE TABLE dwh.dim_account (
  accountID INT NOT NULL,
  accountName VARCHAR(255) NOT NULL,
  accountDescription VARCHAR(255) NOT NULL,
  brokerageFundID INT NULL,
  entityID INT NULL,
  startDate DATETIME NOT NULL,
  currentFlag INT NOT NULL DEFAULT 1,
  PRIMARY KEY (accountID),
  CONSTRAINT fk_entity FOREIGN KEY (entityID) REFERENCES dwh.dim_entity (entityID));
CREATE UNIQUE INDEX entity_UNIQUE ON dwh.dim_account (accountName ASC) ;
CREATE INDEX fk_entity_idx ON dwh.dim_account (entityID ASC);

-- -----------------------------------------------------
-- Table dwh.dim_time
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_time ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='dim_time' AND xtype='U')
CREATE TABLE dwh.dim_time (
  timeID INT NOT NULL,
  dayNumberInMonth INT NOT NULL,
  month VARCHAR(45) NOT NULL DEFAULT 1,
  monthNumberOverall INT NULL,
  quarter INT NULL,
  year INT NULL,
  weekdayFlag INT NULL,
  lastDayInMonthFlag INT NULL,
  PRIMARY KEY (timeID));

-- -----------------------------------------------------
-- Table dwh.fact_balance
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.fact_balance ;
IF NOT EXISTS (SELECT * FROM sysobjects WHERE nAme='fact_balance' AND xtype='U')
CREATE TABLE dwh.fact_balance (
  balanceID INT NOT NULL,
  timeID INT NOT NULL,
  entityID INT NOT NULL,
  accountID INT NOT NULL,
  balance BIGINT NOT NULL,
  staticComponent BIGINT NULL,
  PRIMARY KEY (balanceID),
  CONSTRAINT fk_account FOREIGN KEY (accountID) REFERENCES dwh.dim_account (accountID),
  CONSTRAINT fk_time FOREIGN KEY (timeID) REFERENCES dwh.dim_time (timeID));
