/**
 * 
 */
const {Database} = require('../config');
const Sequelize = require('sequelize');

const AccountModel = require('../components/account/Account');
const TransactionModel = require('../components/transaction/Transaction');
const LoanModel = require('../components/transaction/loan/Loan');

const sequelize = new Sequelize(Database.name,Database.user,Database.password,{
  host: Database.host,
  dialect: Database.dialect,
  pool: {
    max: 6,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Account = AccountModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize,Sequelize);
const Loan = LoanModel(sequelize,Sequelize);

module.exports = {
  Sequelize,
  sequelize,
  Account,
  Transaction,
  Loan
};