const jwt = require('jsonwebtoken');
const { Account } = require('../../utilities/database');
const TransError = require('../../utilities/TransError');
const { SECRET } = require('../../config');

/**
 * 对账户PIN码进行认证
 */
module.exports = {
  login: ({ number, pin }) => {
    return Account.findOne({ where: { number: number } })
      .then(model => {
        let account = model.get();
        if (account.pin === pin) {
          return jwt.sign({
            number: account.number,
            credits: account.credits
          }, SECRET, {
            expiresIn: 60 * 30
          });
        } else {
          throw TransError.AUTHENTICATION_FAIL;
        }
      });
  }
}