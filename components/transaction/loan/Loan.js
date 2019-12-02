/**
 * 定义贷款实体模型
 */
module.exports = (sequelize, Sequelize) => sequelize.define('Loan', {
  serial:{
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.STRING,
    validate: {
      isDecimal: true,
      allowNull: false,
      len: 19
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    validate: {
      isDecimal: true,
      allowNull: false
    }
  },
  status: {
    type: Sequelize.STRING
  }
});
