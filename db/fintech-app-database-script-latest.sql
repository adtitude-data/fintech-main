/****** Object:  Database [iftdb]    Script Date: 28-04-2022 16:17:19 ******/
CREATE DATABASE [iftdb]  (EDITION = 'GeneralPurpose', SERVICE_OBJECTIVE = 'GP_Gen5_2', MAXSIZE = 32 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS;
GO
ALTER DATABASE [iftdb] SET COMPATIBILITY_LEVEL = 150
GO
ALTER DATABASE [iftdb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [iftdb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [iftdb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [iftdb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [iftdb] SET ARITHABORT OFF 
GO
ALTER DATABASE [iftdb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [iftdb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [iftdb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [iftdb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [iftdb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [iftdb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [iftdb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [iftdb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [iftdb] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [iftdb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [iftdb] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [iftdb] SET  MULTI_USER 
GO
ALTER DATABASE [iftdb] SET ENCRYPTION ON
GO
ALTER DATABASE [iftdb] SET QUERY_STORE = ON
GO
ALTER DATABASE [iftdb] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** The scripts of database scoped configurations in Azure should be executed inside the target database connection. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
GO
/****** Object:  Schema [dwh]    Script Date: 28-04-2022 16:17:19 ******/
CREATE SCHEMA [dwh]
GO
/****** Object:  Table [dbo].[agents_clients_pv]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[agents_clients_pv](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[agent_id] [int] NOT NULL,
	[client_id] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_accounts_balance]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_accounts_balance](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[item_id] [nvarchar](255) NOT NULL,
	[current_val] [nvarchar](255) NULL,
	[iso_currency_code] [nvarchar](255) NULL,
	[mask] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[official_name] [nvarchar](255) NULL,
	[type_val] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_accounts_token]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_accounts_token](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_id] [nvarchar](255) NOT NULL,
	[inst_name] [nvarchar](255) NOT NULL,
	[item_id] [nvarchar](255) NOT NULL,
	[access_token] [nvarchar](255) NOT NULL,
	[is_access_token_expired] [int] NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_agents_clients_pv]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_agents_clients_pv](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[agent_id] [int] NOT NULL,
	[client_id] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_client_accounts]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_client_accounts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[agent_id] [int] NOT NULL,
	[client_id] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_cron_jobs]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_cron_jobs](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[account_id] [int] NOT NULL,
	[jobName] [nvarchar](255) NOT NULL,
	[status] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_jwt_refresh_tokens]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_jwt_refresh_tokens](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[token] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_jwt_tokens]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_jwt_tokens](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[token] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_plaid_accounts]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_plaid_accounts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[plaid_account_id] [nvarchar](255) NOT NULL,
	[status] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_sub_accounts]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_sub_accounts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[sub_account_id] [nvarchar](255) NOT NULL,
	[status] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_twofa_tokens]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_twofa_tokens](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[token] [nvarchar](255) NOT NULL,
	[qr_code] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[app_users]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fullname] [nvarchar](255) NULL,
	[email] [nvarchar](255) NOT NULL,
	[phone] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[salt] [nvarchar](255) NULL,
	[is_2fa_active] [bit] NOT NULL,
	[is_2fa_logged] [bit] NOT NULL,
	[role] [varchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_balance]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_balance](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[plaid_account_id] [nvarchar](255) NULL,
	[b_blanace_available] [nvarchar](255) NULL,
	[b_blanace_current] [nvarchar](255) NULL,
	[b_blanace_iso_currency_code] [nvarchar](255) NULL,
	[b_blanace_limit] [nvarchar](255) NULL,
	[b_mask] [nvarchar](255) NULL,
	[b_name] [nvarchar](255) NULL,
	[b_official_name] [nvarchar](255) NULL,
	[b_subtype] [nvarchar](255) NULL,
	[b_type] [nvarchar](255) NULL,
	[b_institution_id] [nvarchar](255) NULL,
	[b_item_id] [nvarchar](255) NULL,
	[b_request_id] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_institutions]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_institutions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[country_codes] [nvarchar](255) NOT NULL,
	[institution_id] [nvarchar](255) NOT NULL,
	[logo] [nvarchar](max) NULL,
	[name] [nvarchar](255) NULL,
	[oauth] [bit] NULL,
	[primary_color] [nvarchar](255) NULL,
	[products] [nvarchar](255) NULL,
	[routing_numbers] [nvarchar](max) NULL,
	[url] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_investments_holdings]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_investments_holdings](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[plaid_account_id] [nvarchar](255) NOT NULL,
	[h_account_id] [nvarchar](255) NOT NULL,
	[h_cost_basis] [nvarchar](255) NULL,
	[h_institution_price] [nvarchar](255) NULL,
	[h_institution_price_as_of] [nvarchar](255) NULL,
	[h_institution_value] [nvarchar](255) NULL,
	[h_iso_currency_code] [nvarchar](255) NULL,
	[h_quantity] [nvarchar](255) NULL,
	[h_security_id] [nvarchar](255) NULL,
	[h_unofficial_currency_code] [nvarchar](255) NULL,
	[h_request_id] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_investments_securities]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_investments_securities](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[plaid_account_id] [nvarchar](255) NULL,
	[s_close_price] [nvarchar](255) NULL,
	[s_close_price_as_of] [nvarchar](255) NULL,
	[s_cusip] [nvarchar](255) NULL,
	[s_institution_id] [nvarchar](255) NULL,
	[s_institution_security_id] [nvarchar](255) NULL,
	[s_is_cash_equivalent] [nvarchar](255) NULL,
	[s_isin] [nvarchar](255) NULL,
	[s_iso_currency_code] [nvarchar](255) NULL,
	[s_name] [nvarchar](255) NULL,
	[s_proxy_security_id] [nvarchar](255) NULL,
	[s_security_id] [nvarchar](255) NULL,
	[s_sedol] [nvarchar](255) NULL,
	[s_ticker_symbol] [nvarchar](255) NULL,
	[s_type] [nvarchar](255) NULL,
	[s_unofficial_currency_code] [nvarchar](255) NULL,
	[s_request_id] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_liabilities_credit]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_liabilities_credit](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[plaid_account_id] [nvarchar](255) NULL,
	[l_account_id] [nvarchar](255) NULL,
	[l_is_overdue] [nvarchar](255) NULL,
	[l_last_payment_amount] [nvarchar](255) NULL,
	[l_last_payment_date] [nvarchar](255) NULL,
	[l_last_statement_balance] [nvarchar](255) NULL,
	[l_last_statement_issue_date] [nvarchar](255) NULL,
	[l_minimum_payment_amount] [nvarchar](255) NULL,
	[l_next_payment_due_date] [nvarchar](255) NULL,
	[l_request_id] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_liabilities_credit_interest]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_liabilities_credit_interest](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[plaid_account_id] [int] NOT NULL,
	[plaid_liabilities_credit_id] [int] NOT NULL,
	[lci_apr_percentage] [nvarchar](255) NULL,
	[lci_apr_type] [nvarchar](255) NULL,
	[lci_balance_subject_to_apr] [nvarchar](255) NULL,
	[lci_interest_charge_amount] [nvarchar](255) NULL,
	[l_request_id] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_liabilities_mortgage]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_liabilities_mortgage](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[plaid_account_id] [nvarchar](255) NULL,
	[lm_account_id] [nvarchar](255) NULL,
	[lm_account_number] [nvarchar](255) NULL,
	[lm_current_late_fee] [nvarchar](255) NULL,
	[lm_escrow_balance] [nvarchar](255) NULL,
	[lm_has_pmi] [nvarchar](255) NULL,
	[lm_has_prepayment_penalty] [nvarchar](255) NULL,
	[lm_interest_rate_percentage] [nvarchar](255) NULL,
	[lm_interest_rate_type] [nvarchar](255) NULL,
	[lm_last_payment_amount] [nvarchar](255) NULL,
	[lm_last_payment_date] [nvarchar](255) NULL,
	[lm_loan_term] [nvarchar](255) NULL,
	[lm_loan_type_description] [nvarchar](255) NULL,
	[lm_maturity_date] [nvarchar](255) NULL,
	[lm_next_monthly_payment] [nvarchar](255) NULL,
	[lm_next_payment_due_date] [nvarchar](255) NULL,
	[lm_origination_date] [nvarchar](255) NULL,
	[lm_origination_principal_amount] [nvarchar](255) NULL,
	[lm_past_due_amount] [nvarchar](255) NULL,
	[lm_property_address_city] [nvarchar](255) NULL,
	[lm_property_address_country] [nvarchar](255) NULL,
	[lm_property_address_postal_code] [nvarchar](255) NULL,
	[lm_property_address_region] [nvarchar](255) NULL,
	[lm_property_address_street] [nvarchar](255) NULL,
	[lm_ytd_interest_paid] [nvarchar](255) NULL,
	[lm_ytd_principal_paid] [nvarchar](255) NULL,
	[lm_request_id] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[plaid_liabilities_student]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[plaid_liabilities_student](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [int] NOT NULL,
	[inst_account_id] [int] NOT NULL,
	[ls_account_id] [nvarchar](255) NULL,
	[plaid_account_id] [nvarchar](255) NULL,
	[ls_account_number] [nvarchar](255) NULL,
	[ls_disbursement_dates] [nvarchar](255) NULL,
	[ls_expected_payoff_date] [nvarchar](255) NULL,
	[ls_guarantor] [nvarchar](255) NULL,
	[ls_interest_rate_percentage] [nvarchar](255) NULL,
	[ls_is_overdue] [nvarchar](255) NULL,
	[ls_last_payment_amount] [nvarchar](255) NULL,
	[ls_last_payment_date] [nvarchar](255) NULL,
	[ls_last_statement_balance] [nvarchar](255) NULL,
	[ls_last_statement_issue_date] [nvarchar](255) NULL,
	[ls_loan_name] [nvarchar](255) NULL,
	[ls_loan_status_end_date] [nvarchar](255) NULL,
	[ls_loan_status_type] [nvarchar](255) NULL,
	[ls_minimum_payment_amount] [nvarchar](255) NULL,
	[ls_next_payment_due_date] [nvarchar](255) NULL,
	[ls_origination_date] [nvarchar](255) NULL,
	[ls_origination_principal_amount] [nvarchar](255) NULL,
	[ls_outstanding_interest_amount] [nvarchar](255) NULL,
	[ls_payment_reference_number] [nvarchar](255) NULL,
	[ls_pslf_status_estimated_eligibility_date] [nvarchar](255) NULL,
	[ls_pslf_status_payments_made] [nvarchar](255) NULL,
	[ls_pslf_status_payments_remaining] [nvarchar](255) NULL,
	[ls_repayment_plan_description] [nvarchar](255) NULL,
	[ls_repayment_plan_type] [nvarchar](255) NULL,
	[ls_sequence_number] [nvarchar](255) NULL,
	[ls_servicer_address_city] [nvarchar](255) NULL,
	[ls_servicer_address_country] [nvarchar](255) NULL,
	[ls_servicer_address_postal_code] [nvarchar](255) NULL,
	[ls_servicer_address_region] [nvarchar](255) NULL,
	[ls_servicer_address_street] [nvarchar](255) NULL,
	[ls_ytd_interest_paid] [nvarchar](255) NULL,
	[ls_ytd_principal_paid] [nvarchar](255) NULL,
	[ls_request_id] [nvarchar](255) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SequelizeMeta]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SequelizeMeta](
	[name] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dwh].[dim_account]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dwh].[dim_account](
	[accountID] [int] IDENTITY(1,1) NOT NULL,
	[instID] [int] NOT NULL,
	[accountName] [varchar](255) NULL,
	[accountPlaidID] [varchar](255) NULL,
	[accountMask] [varchar](20) NULL,
	[accountDescription] [varchar](255) NULL,
	[accountType] [varchar](55) NULL,
	[accountSubType] [varchar](55) NULL,
	[recordCreatedDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[accountID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dwh].[dim_entity]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dwh].[dim_entity](
	[entityID] [int] IDENTITY(1,1) NOT NULL,
	[entityName] [varchar](255) NULL,
	[appEntityID] [int] NOT NULL,
	[recordCreatedDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[entityID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dwh].[dim_institution]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dwh].[dim_institution](
	[instID] [int] IDENTITY(1,1) NOT NULL,
	[instName] [varchar](255) NULL,
	[plaidInstID] [varchar](255) NULL,
	[recordCreatedDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[instID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dwh].[fact_balance]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dwh].[fact_balance](
	[balanceID] [int] IDENTITY(1,1) NOT NULL,
	[accountID] [int] NOT NULL,
	[instID] [int] NOT NULL,
	[accountName] [varchar](255) NULL,
	[accountPlaidId] [varchar](255) NULL,
	[accountMask] [varchar](255) NULL,
	[entityID] [int] NOT NULL,
	[balanceAvailable] [varchar](55) NULL,
	[balanceCurrent] [varchar](55) NULL,
	[currencyCode] [varchar](55) NULL,
	[balanceLimit] [varchar](55) NULL,
	[mostrecentflag] [int] NOT NULL,
	[recordCreatedDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[balanceID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dwh].[fact_balance] ADD  DEFAULT ((0)) FOR [mostrecentflag]
GO
ALTER TABLE [dbo].[app_users]  WITH CHECK ADD CHECK  (([role]=N'Client' OR [role]=N'Agent' OR [role]=N'Admin'))
GO
/****** Object:  StoredProcedure [dwh].[v3_populateDWH]    Script Date: 28-04-2022 16:17:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dwh].[v3_populateDWH]
AS


-------------------------
-- Populate dim_institution table
-------------------------
INSERT INTO dwh.dim_institution (instName, plaidInstID , recordCreatedDate)
SELECT 
    [name] AS instName, 
    institution_id AS plaidInstID,
    CAST(GETDATE() AS DATE) AS recordCreatedDate
FROM [dbo].[plaid_institutions] pi
LEFT OUTER JOIN dwh.dim_institution inst 
ON inst.instName = pi.[name]
WHERE inst.instName IS NULL

-------------------------
-- Populate dim_entity table
-------------------------
INSERT INTO dwh.dim_entity (entityName, appEntityID , recordCreatedDate)
SELECT 
    au.fullname AS entityName,
	au.id AS appEntityID,
	CAST(GETDATE() AS DATE) AS recordCreatedDate
FROM app_users au
LEFT JOIN dwh.dim_entity ent
ON ent.entityName = au.fullname
WHERE au.[role] = 'Client' AND ent.entityName IS NULL


------------------------------
-- Populate dim_account table
------------------------------
INSERT INTO dwh.dim_account (instID , accountName, accountPlaidID, accountMask, accountDescription, accountType, accountSubType , recordCreatedDate)
SELECT 
    inst.instID,
    bal.b_name AS accountName,
	bal.plaid_account_id AS accountPlaidID,
	bal.b_mask AS accountMask,
    bal.b_official_name AS accountDescription,
    bal.b_type AS accountType,
    bal.b_subtype AS accountSubType,
    CAST(GETDATE() AS DATE) AS recordCreatedDate
FROM [dbo].[plaid_balance] bal
INNER JOIN dwh.dim_institution inst
ON bal.b_institution_id = inst.plaidInstID
LEFT JOIN dwh.dim_account acc 
ON inst.instID = acc.instID AND bal.b_name = acc.accountName AND bal.plaid_account_id = acc.accountPlaidID  AND bal.b_type = acc.accountType 
WHERE acc.accountName IS NULL AND acc.accountType IS NULL 
GROUP BY inst.instID, bal.plaid_account_id , bal.b_name, bal.b_mask, bal.b_official_name, bal.b_type, bal.b_subtype



------------------------------
-- Populate fact_balance table
------------------------------
DROP TABLE IF EXISTS #temp_balance
SELECT 
    (select TOP 1 acc.accountID from dwh.dim_account acc where bal.plaid_account_id = acc.accountPlaidID) AS accountID, 
	(select TOP 1 inst.instID from dwh.dim_institution inst where bal.b_institution_id = inst.plaidInstID) AS instID,
    bal.b_name AS accountName,
	bal.plaid_account_id AS accountPlaidId,
    bal.b_mask AS accountMask,
    (select TOP 1 ent.entityID from dwh.dim_entity ent where bal.client_id = ent.appEntityID) AS entityID,
    bal.b_blanace_available AS balanceAvailable,
    bal.b_blanace_current AS balanceCurrent,
    bal.b_blanace_iso_currency_code AS currencyCode,
    bal.b_blanace_limit AS balanceLimit,
	1 AS mostrecentflag,
    CAST(GETDATE() AS DATE) AS recordCreatedDate
INTO #temp_balance
FROM [dbo].[plaid_balance] bal
--select * from #temp_balance
INSERT INTO dwh.fact_balance
SELECT tbal.*
FROM #temp_balance tbal
--WHERE NOT EXISTS 
--(
 --   SELECT 1 
 --   FROM dwh.fact_balance bal WHERE
 --   bal.accountID = tbal.accountID AND
 --   bal.entityID = tbal.entityID AND
  --  bal.balanceCurrent = tbal.balanceCurrent -- AND
    --bal.recordCreatedDate = tbal.recordCreatedDate 
--)
GO
ALTER DATABASE [iftdb] SET  READ_WRITE 
GO
