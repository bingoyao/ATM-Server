/**
 * 定义事务实体模型
 */
module.exports = (sequelize, Sequelize) => sequelize.define('Transaction', {
  type: {
    type: Sequelize.STRING
  },
  serial: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.STRING,
    validate: {
      isDecimal: true,
      len: 19
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    validate: {
      isDecimal: true
    }
  },
  transTo: {
    type: Sequelize.STRING
  }
});
