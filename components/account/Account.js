/**
 * 定义账户实体模型
 */
module.exports = (sequelize, Sequelize) => sequelize.define('Account', {
  name: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.STRING
  },
  balances: {
    type: Sequelize.INTEGER
  },
  credits: {
    type: Sequelize.INTEGER
  },
  telephone: {
    type: Sequelize.STRING,
    validate: {
      isDecimal: true,
      len: 11
    }
  },
  pin: {
    type: Sequelize.STRING,
    validate: {
      isDecimal: true,
      len: 6
    }
  }
});
