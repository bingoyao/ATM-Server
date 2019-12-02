const uuid = require('uuid/v1');
const crypto = require('crypto');

// console.log(crypto.randomBytes(12).toString('hex').toUpperCase());

module.exports = {
  randomId: () => crypto.randomBytes(12).toString('hex'),
  transactionType: {
    WITHDRAWAL: ''
  }
}