var express = require("express");
var router = express.Router();
const VerifyToken = require("../middlewares/verifyToken");
const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const { ErrorHandler } = require("../helpers/errorHandler");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config);

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

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

/* Get Agents List */
router.get("/list/:clientId", VerifyToken , async function (req, res, next) {
  try {
    const queryText = ""+
      "SELECT "+ 
      "a_t.id , a_t.client_id , a_t.item_id  , a_t.account_name , "+
      "(SELECT current_val FROM accounts_balance as inu WHERE inu.item_id = a_t.item_id) as current_val , "+
      "(SELECT iso_currency_code FROM accounts_balance as inu WHERE inu.item_id = a_t.item_id) as iso_currency_code ,"+
      "(SELECT logo FROM plaid_institutions as pi WHERE pi.institution_id = a_t.inst_id) as inst_logo ,"+
      "(SELECT name FROM plaid_institutions as pi WHERE pi.institution_id = a_t.inst_id) as inst_name "+
      "FROM accounts_token as a_t "+
      "where a_t.client_id = "+req.params.clientId+" "+
    '';
    const accountsList = await sequelize.query(queryText,{type: sequelize.QueryTypes.SELECT});
    
    res.status(StatusCodes.OK).json({
      data: accountsList,
    });
  } catch (error) {
    next(error);
  }
});

/* Get Single Account List */
router.get("/remove/:accountId", VerifyToken , async function (req, res, next) {
  try {
    const des = await models.AccountsTokens.destroy({
      where: {
        id: req.params.accountId
      }
    });
 
    var status = 100;
    if(des) status = 200;
    res.status(StatusCodes.OK).json({
      status: status,
    });
  } catch (error) {
    next(error);
  }
});


router.post("/live/balance/", VerifyToken , async function (req, res, next) {
  try {
    const getAccessToken = await models.AccountsTokens.findOne({
      where: { item_id: req.body.item_id , client_id: req.body.clientId },
    });
    console.log('getAccessToken',getAccessToken);
    if(getAccessToken){
      const balanceResponse = await client.accountsBalanceGet({
        access_token: getAccessToken.access_token,
      });

      res.status(StatusCodes.OK).json({
        data: balanceResponse.data
      });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
