-------------------------
-- Create DWH schema
-------------------------

IF EXISTS (SELECT name FROM sys.schemas WHERE name = N'dwh')
   BEGIN
      DROP SCHEMA [dwh]
END
GO
CREATE SCHEMA [dwh] 
GO

-------------------------
-- Create institution table
-------------------------
DROP TABLE IF EXISTS [dwh].[dim_institution];
CREATE TABLE [dwh].[dim_institution](
	[instID] [int] IDENTITY(1,1) PRIMARY KEY,
	[instName] [varchar](255) NOT NULL,
    plaidInsID [varchar](255) NOT NULL,
	[recordCreatedDate] [datetime] NOT NULL
) ON [PRIMARY];

-------------------------
-- Create entity table
-------------------------
DROP TABLE IF EXISTS [dwh].[dim_entity];
CREATE TABLE [dwh].[dim_entity](
	[entityID] [int] NOT NULL,
	[entityName] [varchar](255) NOT NULL,
	[recordCreatedDate] [datetime] NOT NULL
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
  recordCreatedDate DATETIME NOT NULL
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
	[recordCreatedDate] [datetime] NOT NULL
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
ALTER TABLE [dwh].[map_entityClientRelation]  WITH CHECK ADD  CONSTRAINT [fk_entityMapping] FOREIGN KEY([entityID]) REFERENCES [dwh].[dim_entity] ([entityID])
GO
ALTER TABLE [dwh].[map_entityClientRelation]  WITH CHECK ADD  CONSTRAINT [fk_clientMapping] FOREIGN KEY([clientID]) REFERENCES [dwh].[dim_client] ([clientID])
GO
ALTER TABLE [dwh].[map_entityClientRelation] CHECK CONSTRAINT [fk_entityMapping]
GO
ALTER TABLE [dwh].[map_entityClientRelation] CHECK CONSTRAINT [fk_clientMapping]
GO


-- -----------------------------------------------------
-- Create account table
-- -----------------------------------------------------
DROP TABLE IF EXISTS dwh.dim_account;
CREATE TABLE [dwh].[dim_account](
	[accountID] [int] IDENTITY(1,1) NOT NULL,
	[institutionID] [int] NULL,
	[accountName] [varchar](255) NOT NULL,
	[accountDescription] [varchar](255) NULL,
	[accountType] [varchar](255) NOT NULL,
	[accountSubType] [varchar](255) NOT NULL,
	[recordCreatedDate] [datetime] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dwh].[dim_account] ADD PRIMARY KEY CLUSTERED 
(
	[accountID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dwh].[dim_account] ADD  DEFAULT ((1)) FOR [currentFlag]
GO

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
  recordCreatedDate DATE NOT NULL)
