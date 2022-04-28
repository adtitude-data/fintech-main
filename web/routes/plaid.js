require('dotenv').config();
var express = require("express");
var router = express.Router();
const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const { Configuration, PlaidApi, PlaidEnvironments , InstitutionsGetRequest } = require('plaid');
const util = require('util');
const bodyParser = require('body-parser');
const moment = require('moment');
const VerifyToken = require("../middlewares/verifyToken");
const { ErrorHandler } = require("../helpers/errorHandler");
const { json } = require('body-parser');
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');

const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

// PLAID_PRODUCTS is a comma-separated client list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(
  ',',
);

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

// Parameters used for the OAuth redirect Link flow.
//
// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

// Parameter used for OAuth in Android. This should be the package name of your app,
// e.g. com.plaid.linksample
const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || '';

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
// The payment_id is only relevant for the UK Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store
let PAYMENT_ID = null;
// The transfer_id is only relevant for Transfer ACH product.
// We store the transfer_id in memomory - in produciton, store it in a secure
// persistent data store
let TRANSFER_ID = null;

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

router.post('/info', function (request, response, next) {
  console.log('PLAID_CLIENT_ID',PLAID_CLIENT_ID);
  console.log('PLAID_SECRET',PLAID_SECRET);
  response.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: PLAID_PRODUCTS,
  });
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
router.post('/create_link_token', async function (request, response) {
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user-id',
    },
    client_name: 'Plaid Quickstart',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
  };

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }

  if (PLAID_ANDROID_PACKAGE_NAME !== '') {
    configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
  }
  try {
    const createTokenResponse = await client.linkTokenCreate(configs);
    prettyPrintResponse(createTokenResponse);
    response.json(createTokenResponse.data);
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#payment-initiation-create-link-token-request
router.post(
  '/create_link_token_for_payment',
  async function (request, response, next) {
    try {
      const createRecipientResponse = await client.paymentInitiationRecipientCreate(
        {
          name: 'Harry Potter',
          iban: 'GB33BUKB20201555555555',
          address: {
            street: ['4 Privet Drive'],
            city: 'Little Whinging',
            postal_code: '11111',
            country: 'GB',
          },
        },
      );
      const recipientId = createRecipientResponse.data.recipient_id;
      prettyPrintResponse(createRecipientResponse);

      const createPaymentResponse = await client.paymentInitiationPaymentCreate(
        {
          recipient_id: recipientId,
          reference: 'paymentRef',
          amount: {
            value: 1.34,
            currency: 'GBP',
          },
        },
      );
      prettyPrintResponse(createPaymentResponse);
      const paymentId = createPaymentResponse.data.payment_id;
      PAYMENT_ID = paymentId;
      const configs = {
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: 'user-id',
        },
        client_name: 'Plaid Quickstart',
        products: PLAID_PRODUCTS,
        country_codes: PLAID_COUNTRY_CODES,
        language: 'en',
        payment_initiation: {
          payment_id: paymentId,
        },
      };
      if (PLAID_REDIRECT_URI !== '') {
        configs.redirect_uri = PLAID_REDIRECT_URI;
      }
      const createTokenResponse = await client.linkTokenCreate(configs);
      prettyPrintResponse(createTokenResponse);
      response.json(createTokenResponse.data);
    } catch (error) {
      prettyPrintResponse(error.response);
      return response.json(formatError(error.response));
    }
  },
);

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
router.post('/set_access_token', async function (request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  try {
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: PUBLIC_TOKEN,
    });
    prettyPrintResponse(tokenResponse);
    ACCESS_TOKEN = tokenResponse.data.access_token;
    ITEM_ID = tokenResponse.data.item_id;
    if (PLAID_PRODUCTS.includes('transfer')) {
      TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
    }
    

    var itemResponse = await client.itemGet({ access_token: ACCESS_TOKEN });
    var inst_id = itemResponse.data.item.institution_id;
    const configs = {
      institution_id: itemResponse.data.item.institution_id,
      country_codes: ['US'],
      options : {
        include_optional_metadata: true
      }
    };
    var instResponse = await client.institutionsGetById(configs);
    var account_name = instResponse.data.institution.name;
    
    const checkInst = await models.PlaidInstitutions.findOne({
      where: { institution_id: inst_id },
    });
    
    if(!checkInst){
      var instInfo = await models.PlaidInstitutions.create({
        country_codes : instResponse.data.institution.country_codes.join(',') ,
        institution_id : instResponse.data.institution.institution_id ,
        logo : instResponse.data.institution.logo ,
        name : instResponse.data.institution.name ,
        oauth : instResponse.data.institution.oauth ,
        primary_color : instResponse.data.institution.primary_color ,
        products : instResponse.data.institution.products.join(',') ,
        routing_numbers : instResponse.data.institution.routing_numbers.join(','),
        url : instResponse.data.institution.url ,
      });
    }
    
    
    /* account_name */

    // Add Token to database along with user id. 
    // check if email already exists
    const doesAccountExits = await models.AccountsTokens.findOne({
      where: { item_id: ITEM_ID },
    });

    if (doesAccountExits) {
      
    }else{
      const accountCreated = await models.AccountsTokens.create({
        client_id: request.body.clientid,
        inst_id: inst_id,
        account_name: account_name,
        item_id: ITEM_ID,
        access_token: ACCESS_TOKEN
      });   
    }
    
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null,
      instResponse: instResponse.data.institution.name,
    });

  } catch (error) {
    next(error);
  }
});

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
router.get('/auth', async function (request, response, next) {
  try {
    const authResponse = await client.authGet({ access_token: ACCESS_TOKEN });
    prettyPrintResponse(authResponse);
    response.json(authResponse.data);
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
router.get('/transactions', async function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  const configs = {
    access_token: ACCESS_TOKEN,
    start_date: startDate,
    end_date: endDate,
    options: {
      count: 250,
      offset: 0,
    },
  };
  try {
    const transactionsResponse = await client.transactionsGet(configs);
    prettyPrintResponse(transactionsResponse);
    response.json(transactionsResponse.data);
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Retrieve Investment Transactions for an Item
// https://plaid.com/docs/#investments
router.get(
  '/investment_transactions',
  async function (request, response, next) {
    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    const configs = {
      access_token: ACCESS_TOKEN,
      start_date: startDate,
      end_date: endDate,
    };
    try {
      const investmentTransactionsResponse = await client.investmentTransactionsGet(
        configs,
      );
      prettyPrintResponse(investmentTransactionsResponse);
      response.json({
        error: null,
        investment_transactions: investmentTransactionsResponse.data,
      });
    } catch (error) {
      prettyPrintResponse(error.response);
      return response.json(formatError(error.response));
    }
  },
);

// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
router.get('/identity', async function (request, response, next) {
  try {
    const identityResponse = await client.identityGet({
      access_token: ACCESS_TOKEN,
    });
    prettyPrintResponse(identityResponse);
    response.json({ identity: identityResponse.data.accounts });
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
router.get('/balance', async function (request, response, next) {
  try {
    const balanceResponse = await client.accountsBalanceGet({
      access_token: ACCESS_TOKEN,
    });
    prettyPrintResponse(balanceResponse);
    response.json(balanceResponse.data);
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Retrieve Holdings for an Item
// https://plaid.com/docs/#investments
router.get('/holdings', async function (request, response, next) {
  try {
    const holdingsResponse = await client.investmentsHoldingsGet({
      access_token: ACCESS_TOKEN,
    });
    prettyPrintResponse(holdingsResponse);
    response.json({ error: null, holdings: holdingsResponse.data });
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
router.get('/item', async function (request, response, next) {
  try {
    // Pull the Item - this includes information about available products,
    // billed products, webhook information, and more.
    const itemResponse = await client.itemGet({ access_token: ACCESS_TOKEN });
    // Also pull information about the institution
    const configs = {
      institution_id: itemResponse.data.item.institution_id,
      country_codes: ['US'],
    };
    const instResponse = await client.institutionsGetById(configs);
    prettyPrintResponse(itemResponse);
    response.json({
      item: itemResponse.data.item,
      institution: instResponse.data.institution,
    });
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
router.get('/accounts', async function (request, response, next) {
  try {
    const accountsResponse = await client.accountsGet({
      access_token: ACCESS_TOKEN,
    });
    prettyPrintResponse(accountsResponse);
    response.json(accountsResponse.data);
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Create and then retrieve an Asset Report for one or more Items. Note that an
// Asset Report can contain up to 100 items, but for simplicity we're only
// including one Item here.
// https://plaid.com/docs/#assets
router.get('/assets', async function (request, response, next) {
  // You can specify up to two years of transaction history for an Asset
  // Report.
  const daysRequested = 10;

  // The `options` object allows you to specify a webhook for Asset Report
  // generation, as well as information that you want included in the Asset
  // Report. All fields are optional.
  const options = {
    client_report_id: 'Custom Report ID #123',
    // webhook: 'https://your-domain.tld/plaid-webhook',
    user: {
      client_user_id: 'Custom User ID #456',
      first_name: 'Alice',
      middle_name: 'Bobcat',
      last_name: 'Cranberry',
      ssn: '123-45-6789',
      phone_number: '555-123-4567',
      email: 'alice@example.com',
    },
  };
  const configs = {
    access_tokens: [ACCESS_TOKEN],
    days_requested: daysRequested,
    options,
  };
  try {
    const assetReportCreateResponse = await client.assetReportCreate(configs);
    prettyPrintResponse(assetReportCreateResponse);
    const assetReportToken = assetReportCreateResponse.data.asset_report_token;
    const getResponse = await getAssetReportWithRetries(
      client,
      assetReportToken,
    );
    const pdfRequest = {
      asset_report_token: assetReportToken,
    };

    const pdfResponse = await client.assetReportPdfGet(pdfRequest, {
      responseType: 'arraybuffer',
    });
    prettyPrintResponse(getResponse);
    prettyPrintResponse(pdfResponse);
    response.json({
      json: getResponse.data.report,
      pdf: pdfResponse.data.toString('base64'),
    });
  } catch {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

router.get('/transfer', async function (request, response, next) {
  try {
    const transferGetResponse = await client.transferGet({
      transfer_id: TRANSFER_ID,
    });
    prettyPrintResponse(transferGetResponse);
    response.json({ error: null, transfer: transferGetResponse.data.transfer });
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// This functionality is only relevant for the UK Payment Initiation product.
// Retrieve Payment for a specified Payment ID
router.get('/payment', async function (request, response, next) {
  try {
    const paymentGetResponse = await client.paymentInitiationPaymentGet({
      payment_id: PAYMENT_ID,
    });
    prettyPrintResponse(paymentGetResponse);
    response.json({ error: null, payment: paymentGetResponse.data });
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

const prettyPrintResponse = (response) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

// This is a helper function to poll for the completion of an Asset Report and
// then send it in the response to the client. Alternatively, you can provide a
// webhook in the `options` object in your `/asset_report/create` request to be
// notified when the Asset Report is finished being generated.

const getAssetReportWithRetries = (
  plaidClient,
  asset_report_token,
  ms = 1000,
  retriesLeft = 20,
) =>
  new Promise((resolve, reject) => {
    const request = {
      asset_report_token,
    };

    plaidClient
      .assetReportGet(request)
      .then((response) => {
        return resolve(response);
      })
      .catch(() => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            return reject('Ran out of retries while polling for asset report');
          }
          getAssetReportWithRetries(
            plaidClient,
            asset_report_token,
            ms,
            retriesLeft - 1,
          ).then((response) => resolve(response));
        }, ms);
      });
  });

const formatError = (error) => {
  return {
    error: { ...error.data, status_code: error.status },
  };
};

// This is a helper function to authorize and create a Transfer after successful
// exchange of a public_token for an access_token. The TRANSFER_ID is then used
// to obtain the data about that particular Transfer.

const authorizeAndCreateTransfer = async (accessToken) => {
  try {
    // We call /accounts/get to obtain first account_id - in production,
    // account_id's should be persisted in a data store and retrieved
    // from there.
    const accountsResponse = await client.accountsGet({
      access_token: accessToken
    });
    const accountId = accountsResponse.data.accounts[0].account_id;

    const transferAuthorizationResponse = await client.transferAuthorizationCreate({
      access_token: accessToken,
      account_id: accountId,
      type: 'credit',
      network: 'ach',
      amount: '1.34',
      ach_class: 'ppd',
      user: {
        legal_name: 'FirstName LastName',
        email_address: 'foobar@email.com',
        address: {
          street: '123 Main St.',
          city: 'San Francisco',
          region: 'CA',
          postal_code: '94053',
          country: 'US'
        }
      },
    });
    prettyPrintResponse(transferAuthorizationResponse);
    const authorizationId = transferAuthorizationResponse.data.authorization.id;

    const transferResponse = await client.transferCreate({
      idempotency_key: "1223abc456xyz7890001",
      access_token: accessToken,
      account_id: accountId,
      authorization_id: authorizationId,
      type: 'credit',
      network: 'ach',
      amount: '1.34',
      description: 'Payment',
      ach_class: 'ppd',
      user: {
        legal_name: 'FirstName LastName',
        email_address: 'foobar@email.com',
        address: {
          street: '123 Main St.',
          city: 'San Francisco',
          region: 'CA',
          postal_code: '94053',
          country: 'US'
        }
      },
    });
    prettyPrintResponse(transferResponse);
    return transferResponse.data.transfer.id;
  } catch (error) {
    prettyPrintResponse(error.response);
  }
};


router.get('/cronjob/balance/:accountId', async function (request, response, next) {
  var account_id = request.params.accountId;
  var jsonReturn = {'balance' : false}

  /* Get List of accounts */
  var listOfAccounts = await models.AccountsTokens.findOne({
    attributes: ['client_id', 'account_name','item_id', 'access_token'],
    where: {
      id: request.params.accountId
    }
  });

  if(listOfAccounts){
    var jobReturn = false; 
    var client_id = listOfAccounts.client_id;
    var accessTokenLocal = listOfAccounts.access_token;
    try {
      const balanceResponse = await client.accountsBalanceGet({
        access_token: accessTokenLocal,
      });

      if(balanceResponse.data.accounts.length > 0){
        var dbCreateBalanceOjb = [];
        for(var i = 0 ; i < balanceResponse.data.accounts.length ; i++){
          var x = balanceResponse.data.accounts[i];
          dbCreateBalanceOjb.push({
            client_id: client_id ,
            account_id: account_id ,
            b_account_id: x.account_id ,
            b_blanace_available: x.balances.available ,
            b_blanace_current: x.balances.current ,
            b_blanace_iso_currency_code: x.balances.iso_currency_code ,
            b_blanace_limit: x.balances.limit ,
            b_mask: x.mask ,
            b_name: x.name ,
            b_official_name: x.official_name ,
            b_subtype: x.subtype ,
            b_type: x.type ,
            b_institution_id: balanceResponse.data.item.institution_id ,
            b_item_id: balanceResponse.data.item.item_id ,
            b_request_id: balanceResponse.data.request_id 
          });
          
        }
        var plaidBlanaceInserted = await models.PlaidBalance.bulkCreate(dbCreateBalanceOjb);
        if(plaidBlanaceInserted) jsonReturn.balance = true; 
      }
    } catch (error) {
      jsonReturn.balance = false;
    }
  }

  response.json(jsonReturn);
});


router.get('/cronjob/liabilities/:accountId', async function (request, response, next) {
  var account_id = request.params.accountId;
  var jsonReturn = {
    'credits' : false,
    'mortgage' : false,
    'student' : false,
    'error' : null,
  }

  /* Get List of accounts */
  var listOfAccounts = await models.AccountsTokens.findOne({
    attributes: ['client_id', 'account_name','item_id', 'access_token'],
    where: {
      id: request.params.accountId
    }
  });

  if(listOfAccounts){
    var client_id = listOfAccounts.client_id;
    var accessTokenLocal = listOfAccounts.access_token;
    try {
      const liabilitiesResponse = await client.liabilitiesGet({
        access_token: accessTokenLocal,
      });

      var liabilitiesList = liabilitiesResponse.data.liabilities; 

      if(liabilitiesList){
        /* Credit Insert Start */
        if(liabilitiesList.credit){
          for(var i = 0 ; i < liabilitiesList.credit.length ; i++){
            var x = liabilitiesList.credit[i];
            var dt = {
              client_id: client_id,
              account_id: account_id,
              l_is_overdue: x.last_payment_amount,
              l_last_payment_amount: x.last_payment_amount,
              l_last_payment_date: x.last_payment_date,
              l_last_statement_balance: x.last_statement_balance,
              l_last_statement_issue_date: x.last_statement_issue_date,
              l_minimum_payment_amount: x.minimum_payment_amount,
              l_next_payment_due_date: x.next_payment_due_date,
              l_request_id: liabilitiesResponse.data.request_id
            };
            var resInsertPlaidLiabilitiesCredit = await models.PlaidLiabilitiesCredit.create(dt);

            if(resInsertPlaidLiabilitiesCredit){
              if(x.aprs){
                for(var k = 0 ; k < x.aprs.length ; k++){
                  var y = x.aprs[k];
                  var dtY = {
                    client_id: client_id,
                    account_id: account_id,
                    plaid_liabilities_credit_id: resInsertPlaidLiabilitiesCredit.id,
                    lci_apr_percentage: y.apr_percentage,
                    lci_apr_type: y.apr_type,
                    lci_balance_subject_to_apr: y.balance_subject_to_apr,
                    lci_interest_charge_amount: y.interest_charge_amount,
                    l_request_id : liabilitiesResponse.data.request_id
                  }
                  var resInsertPlaidLiabilitiesCreditInterest = await models.PlaidLiabilitiesCreditInterest.create(dtY);
                }
              } 
            }
          }

          jsonReturn.credits = true;
        }
        /* Credit Insert End */

        /* Mortgage Insert Start */
        if(liabilitiesList.mortgage){
          var dt = [];
          for(var i = 0 ; i < liabilitiesList.mortgage.length ; i++){
            var x = liabilitiesList.mortgage[i];
            dt.push({
              client_id: client_id,
              account_id: account_id,
              lm_account_id : x.account_id,
              lm_account_number : x.account_number,
              lm_current_late_fee : x.current_late_fee,
              lm_escrow_balance: x.escrow_balance,
              lm_has_pmi: x.has_pmi,
              lm_has_prepayment_penalty: x.has_prepayment_penalty,
              lm_interest_rate_percentage: x.interest_rate.percentage,
              lm_interest_rate_type: x.interest_rate.type,
              lm_last_payment_amount: x.last_payment_amount,
              lm_last_payment_date: x.last_payment_date,
              lm_loan_term: x.loan_term,
              lm_loan_type_description: x.loan_type_description,
              lm_maturity_date: x.maturity_date,
              lm_next_monthly_payment: x.next_monthly_payment,
              lm_next_payment_due_date: x.next_payment_due_date,
              lm_origination_date: x.origination_date,
              lm_origination_principal_amount: x.origination_principal_amount,
              lm_past_due_amount: x.past_due_amount,
              lm_property_address_city: x.property_address.city,
              lm_property_address_country: x.property_address.country,
              lm_property_address_postal_code: x.property_address.postal_code,
              lm_property_address_region: x.property_address.region,
              lm_property_address_street: x.property_address.street,
              lm_ytd_interest_paid: x.ytd_interest_paid,
              lm_ytd_principal_paid: x.ytd_principal_paid,
              lm_request_id: liabilitiesResponse.data.request_id
            });
          }
          var resInsertPlaidLiabilitiesMortgage = await models.PlaidLiabilitiesMortgage.bulkCreate(dt);
          if(resInsertPlaidLiabilitiesMortgage){
            jsonReturn.mortgage = true;
          }
        }
        /* Mortgage Insert End */

        /* Student Insert Start */
        if(liabilitiesList.student){
          var dt = [];
          for(var i = 0 ; i < liabilitiesList.student.length ; i++){
            var x = liabilitiesList.student[i];
            dt.push({
              client_id: client_id,
              account_id: account_id,
              ls_account_id: x.account_id,
              ls_account_number: x.account_number,
              ls_disbursement_dates: x.disbursement_dates.join(',') ,
              ls_expected_payoff_date: x.expected_payoff_date,
              ls_guarantor: x.guarantor,
              ls_interest_rate_percentage: x.interest_rate_percentage,
              ls_is_overdue: x.is_overdue,
              ls_last_payment_amount: x.last_payment_amount,
              ls_last_payment_date: x.last_payment_date,
              ls_last_statement_balance: x.last_statement_balance,
              ls_last_statement_issue_date: x.last_statement_issue_date,
              ls_loan_name: x.loan_name,
              ls_loan_status_end_date: x.loan_status.end_date,
              ls_loan_status_type: x.loan_status.type,
              ls_minimum_payment_amount: x.minimum_payment_amount,
              ls_next_payment_due_date: x.next_payment_due_date,
              ls_origination_date: x.origination_date,
              ls_origination_principal_amount: x.origination_principal_amount,
              ls_outstanding_interest_amount: x.outstanding_interest_amount,
              ls_payment_reference_number: x.payment_reference_number,
              ls_pslf_status_estimated_eligibility_date: x.pslf_status.estimated_eligibility_date,
              ls_pslf_status_payments_made: x.pslf_status.payments_made,
              ls_pslf_status_payments_remaining: x.pslf_status.payments_remaining,
              ls_repayment_plan_description: x.repayment_plan.description,
              ls_repayment_plan_type: x.repayment_plan.type,
              ls_sequence_number: x.sequence_number,
              ls_servicer_address_city: x.servicer_address.city,
              ls_servicer_address_country: x.servicer_address.country,
              ls_servicer_address_postal_code: x.servicer_address.postal_code,
              ls_servicer_address_region: x.servicer_address.region,
              ls_servicer_address_street: x.servicer_address.street,
              ls_ytd_interest_paid: x.ytd_interest_paid,
              ls_ytd_principal_paid: x.ytd_principal_paid,
              ls_request_id: liabilitiesResponse.data.request_id 
            });
          }
          var resInsertPlaidLiabilitiesMortgage = await models.PlaidLiabilitiesStudent.bulkCreate(dt);
          if(resInsertPlaidLiabilitiesMortgage){
            jsonReturn.student = true;
          } 
        }
        /* Student Insert End */

      }
    } catch (error) {
      jsonReturn.error = false;
    }
  }

  response.json(jsonReturn);
});


router.get('/cronjob/investment-holdings/:accountId', async function (request, response, next) {
  var account_id = request.params.accountId;
  var jsonReturn = {
    'holdings' : false,
    'securities' : false,
    'error' : null,
  }

  /* Get List of accounts */
  var listOfAccounts = await models.AccountsTokens.findOne({
    attributes: ['client_id', 'account_name','item_id', 'access_token'],
    where: {
      id: request.params.accountId
    }
  });

  if(listOfAccounts){
    var client_id = listOfAccounts.client_id;
    var accessTokenLocal = listOfAccounts.access_token;
    try {
      const investmentsHoldingsResponse = await client.investmentsHoldingsGet({
        access_token: accessTokenLocal,
      });

      /* Holdings Insert Start */
      if(investmentsHoldingsResponse.data.holdings){
        var holdings = investmentsHoldingsResponse.data.holdings;
        
        if(holdings.length > 0){
          var dt = [];
          for(var i = 0 ; i < holdings.length ; i++){
            var x = holdings[i];
            
            dt.push({
              client_id: client_id,
              account_id: account_id,
              h_account_id: x.account_id,
              h_cost_basis: x.cost_basis,
              h_institution_price: x.institution_price,
              h_institution_price_as_of: x.institution_price_as_of,
              h_institution_value: x.institution_value,
              h_iso_currency_code: x.iso_currency_code,
              h_quantity: x.quantity,
              h_security_id: x.security_id,
              h_unofficial_currency_code: x.unofficial_currency_code,
              h_request_id: investmentsHoldingsResponse.data.request_id
            });
          }
          var resInsertPlaidInvestmentsHoldings = await models.PlaidInvestmentsHoldings.bulkCreate(dt);

          if(resInsertPlaidInvestmentsHoldings){
            jsonReturn.holdings = true;
          }
        }
      }
      /* Holdings Insert End */

      /* securities Insert Start */
      if(investmentsHoldingsResponse.data.securities){
        var securities = investmentsHoldingsResponse.data.securities;
        if(securities.length > 0){
          var dt = [];
          for(var i = 0 ; i < securities.length ; i++){
            var x = securities[i];
            dt.push({
              client_id: client_id,
              account_id: account_id,
              s_close_price: x.close_price,
              s_close_price_as_of: x.close_price_as_of,
              s_cusip: x.cusip,
              s_institution_id: x.institution_id,
              s_institution_security_id: x.institution_security_id,
              s_is_cash_equivalent: x.is_cash_equivalent,
              s_isin: x.isin,
              s_iso_currency_code: x.iso_currency_code,
              s_name: x.name,
              s_proxy_security_id: x.proxy_security_id,
              s_security_id: x.security_id,
              s_sedol: x.sedol,
              s_ticker_symbol: x.ticker_symbol,
              s_type: x.type,
              s_unofficial_currency_code: x.unofficial_currency_code,
              s_request_id: investmentsHoldingsResponse.data.request_id
            });
          }

          var resInsertPlaidInvestmentsSecurities = await models.PlaidInvestmentsSecurities.bulkCreate(dt);
          if(resInsertPlaidInvestmentsSecurities){
            jsonReturn.securities = true;
          }
        }
      } 
      /* securities Insert End */
    } catch (error) {
      jsonReturn.error = error;
    }
  }

  response.json(jsonReturn);
});



router.get('/cronjob/update-institutions/', async function (request, response, next) {
  var jsonReturn = {
    'upadted':false,
    'error':null,
  };

  /* var getClientInsts =  */

  /* const configGet = {
    institution_id : request.params.accountId,
    country_codes: PLAID_COUNTRY_CODES,
    options : {
      include_optional_metadata: true
    },
  };
 */
  /* try {
    const response = await client.institutionsGetById(configGet);
    const institutions = response.data;
    console.log('institutions',institutions);
    
  } catch (error) {
    console.log('error',error)
    // Handle error
  } */

  response.json(jsonReturn);
});


module.exports = router;
 