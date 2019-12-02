const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const expressJwt = require('express-jwt');

const database = require('./utilities/database');

const accountRouter = require('./components/account/AccountApi');
const transactionRouter = require('./components/transaction/TransactionApi');
const authRouter = require('./components/auth/AuthApi');

const { SECRET } = require('./config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 初始化数据库

const { Account } = require('./utilities/database');

// 模拟的数据
database.sequelize.sync({ force: true }).then(() => {
  Account.create({
    name: 'Clerk',
    number: '0000000000000000000',
    balances: 0,
    credits: 100,
    telephone: '10101010100',
    pin: '000000'
  }).then(() => {
    Account.create({
      name: 'Bill Gates',
      number: '1111111111222222222',
      balances: 555000000,
      credits: 90,
      telephone: '10101010199',
      pin: '654321'
    })
  });
});

// 除了验证模块，其他模块的访问都要求携带token
app.use(expressJwt({ secret: SECRET }).unless({ path: ['/api/auth','/'] }));

/**
 * 将各模块的接口注册到应用
 */
// 密码认证模块
app.use('/api/auth', authRouter);
// 账户管理模块
app.use('/api/account', accountRouter);
// 事务管理模块
app.use('/api/transaction', transactionRouter);


// 处理404错误
app.use((req, res, next) => {
  next(createError(404, '资源不存在'));
});

// 统一处理所有错误
app.use((err, req, res, next) => {

  if (err.name === 'UnauthorizedError') {
    res.status(401).send('未认证');
  } else {
    res.status(err.statusCode || 500).send(err);
  }

});

module.exports = app;
