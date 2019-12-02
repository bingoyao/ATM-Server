/**
 * 
 */
const { Account, sequelize } = require('../../utilities/database');

module.exports = {
  findAll: () => Account.findAll(),
  findByNumber: (number) => Account.findOne({
    where: {
      number: number
    }
  }),
  create: (account) => sequelize.transaction(t => {
    return Account.create(account, { transaction: t });
  }),
  update: (account) => sequelize.transaction(t => {
    return Account.update({ pin: account.pin }, { where: {number:account.number}, transaction: t });
  })
}