require("dotenv").config();
const cron = require('node-cron');
var express = require("express");
var router = express.Router();
const axios = require('axios');

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(config);
const queryInterface = sequelize.getQueryInterface();
const { QueryTypes } = require('sequelize');

var router = express.Router();
const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const Queue = require('bull');
const myJobQueue = new Queue('myJob');

/* myJobQueue.process(function(job,done){
    // your job complex operations 
    console.log('add',job.data.jobData)
    done();
})
 */

const cronJob = () => {
    cron.schedule('0 23 * * *', (ob) => {
    //cron.schedule('5 */5 * * * *', (ob) => {
        console.log('running a task,',ob);
        getAccounts().then((accounts) => {
           for(var i = 0 ; i < accounts.length ; i++){
                axios.get('http://localhost:'+process.env.PORT+'/api/v1/plaid/cronjob/balance/' + accounts[i].id).then(response => {}).catch(error => {});
                axios.get('http://localhost:'+process.env.PORT+'/api/v1/plaid/cronjob/liabilities/' + accounts[i].id).then(response => {}).catch(error => {});
                axios.get('http://localhost:'+process.env.PORT+'/api/v1/plaid/cronjob/investment-holdings/' + accounts[i].id).then(response => {}).catch(error => {});
            }
        });
    });
};

module.exports = {
  cronJob,
};

const getAccounts = async () => {
    var x = await sequelize.query("SELECT * FROM app_accounts_token", { type: QueryTypes.SELECT });
    /* var listOfAccounts = await sequelize.query({
        attributes: ['client_id', 'account_name','inst_id','item_id', 'access_token']
    } ); */
    return x;
} 