var express = require("express");
var router = express.Router();
const VerifyToken = require("../middlewares/verifyToken");
const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const { ErrorHandler } = require("../helpers/errorHandler");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
//const Sequelize = require("sequelize");
const { Sequelize , Op } = require("sequelize");
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
      "a_t.id , a_t.client_id , a_t.item_id  , a_t.inst_name , "+
      "(SELECT logo FROM plaid_institutions as pi WHERE pi.institution_id = a_t.inst_id) as inst_logo ,"+
      "(SELECT name FROM plaid_institutions as pi WHERE pi.institution_id = a_t.inst_id) as inst_name "+
      "FROM app_accounts_token as a_t "+
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
router.get("/remove/:inst_account_id/:plaid_account_id", VerifyToken , async function (req, res, next) {
  try {

    const GetRecords = await models.PlaidAccounts.findAll({
      where : {
        inst_account_id : req.params.inst_account_id,
        status : 1
      }
    });


    if(GetRecords.length > 1){
      const GetRecordsPlaidAccountId = await models.PlaidAccounts.findAll({
        where : {
          inst_account_id : req.params.inst_account_id,
          plaid_account_id : req.params.plaid_account_id,
          status : 2
        }
      });

      console.log('GetRecordsPlaidAccountId 1 ',GetRecordsPlaidAccountId.length); 
      if(!(GetRecordsPlaidAccountId.length > 0)){
        var des = await models.PlaidAccounts.update({
            status : 2
          },
          { 
            where: { 
              inst_account_id : req.params.inst_account_id,
              plaid_account_id : req.params.plaid_account_id,
            } 
          }
        );

        console.log('deleted called')
      }
    }else{
      var des = await models.AccountsTokens.destroy({
        where: {
          id: req.params.inst_account_id
        }
      });
      var des = await models.PlaidAccounts.destroy({
        where: {
          inst_account_id: req.params.inst_account_id
        }
      });
    }
 
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

    if(getAccessToken){
      const balanceResponse = await client.accountsBalanceGet({
        access_token: getAccessToken.access_token,
      });

      
    var accountsList = [];
    for(var i = 0 ; i < balanceResponse.data.accounts.length ; i++){
      var ac = balanceResponse.data.accounts[i];
      accountsList.push(ac.account_id);
      /* Push to database if account is not there. */

      /* Check of old account detail */
      const GetRecordsPlaidAccountId = await models.PlaidAccounts.findAll({
        where : {
          inst_account_id : getAccessToken.id,
          plaid_account_id : ac.account_id,
        }
      });

      if(!(GetRecordsPlaidAccountId.length > 0)){
        var des = await models.PlaidAccounts.create({
          inst_account_id : getAccessToken.id,
          plaid_account_id : ac.account_id,
          status : 1
        });
      }
    }

    console.log('accountsList',accountsList.join("' , '"))

    const queryText = "SELECT * from 	app_plaid_accounts where inst_account_id = '"+getAccessToken.id+"' and plaid_account_id in ('"+accountsList.join("' , '")+"') " ;
    var verifyDeleteRecords = await sequelize.query(queryText,{type: sequelize.QueryTypes.SELECT});

    res.status(StatusCodes.OK).json({
      data: balanceResponse.data,
      delRef: verifyDeleteRecords
    });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
