const TransError = require('../../utilities/TransError');
const helper = require('../../utilities/helper');
const { Account, Loan, Transaction, sequelize } = require('../../utilities/database');
const { CREDITS_LIMIT } = require('../../config');

module.exports = {
  // 转账
  transfer: (from, to, amount) => {
    return sequelize.transaction(t => {
      return Account
        .findOne({ where: { number: from.number }, transaction: t })
        .then(model => {
          let fromAccount = model.get();
          if (fromAccount.balances < amount) {
            throw TransError.INSUFFICIENT_BALANCE;
          } else {
            return Account.update({ balances: fromAccount.balances - amount }, { where: { number: from.number }, transaction: t });
          }
        })
        .then(() => {
          return Account
            .findOne({ where: { number: to.number }, transaction: t })
            .then(model => {
              let toAccount = model.get();
              return Account.update({ balances: toAccount.balances + amount }, { where: { number: to.number }, transaction: t });
            }).then(() => {
              return Transaction.create({
                type: 'TRANSFER',
                number: from.number,
                transTo: to.number,
                amount: amount,
                serial: helper.randomId()
              });
            }).then(tran => {
              console.log(`Transaction:${tran}`);
              return tran;
            });
        });
    });
  },
  // 存款
  deposit: (inAccount, amount) => {
    return sequelize.transaction(t => {
      return Account
        .findOne({ where: { number: inAccount.number }, transaction: t })
        .then(model => {
          let account = model;
          return Account
            .update({ balances: account.balances + amount }, { where: { number: inAccount.number }, transaction: t })
        })
        .then(() => {
          //console.log('mm:'+JSON.stringify(inAccount));
          return Transaction.create({
            type: 'DEPOSIT',
            number: inAccount.number,
            transTo: '',
            amount: amount,
            serial: helper.randomId()
          }).then(tran => {
            //console.log(`Transaction:${JSON.stringify(tran)}`);
            return tran;
          });
        });
    });
  },
  // 取钱
  withdrawal: (inAccount, amount) => {
    return sequelize.transaction(t => {
      return Account
        .findOne({ where: { number: inAccount.number }, transaction: t })
        .then(model => {
          let account = model;
          if (account.balances < amount) {
            throw TransError.INSUFFICIENT_BALANCE;
          } else {
            return Account
              .update({ balances: account.balances + amount }, { where: { number: inAccount.number }, transaction: t })
          }
        })
        .then(model => {
          let account = model.get();
          return Transaction.create({
            type: 'DEPOSIT',
            number: account.number,
            transTo: '',
            amount: amount,
            serial: helper.randomId()
          });
        })
        .then(model => {
          let tran = model.get();
          console.log(`Transaction:${tran}`);
          return tran;
        });
    });
  },
  // 申请贷款
  requestLoan: (inAccount, amount) => {
    return sequelize.transaction(t => {
      return Account.findOne({ where: { number: inAccount.number }, transaction: t })
        .then(model => {
          let account = model.get();
          if (account.credits < CREDITS_LIMIT) {
            throw TransError.INSUFFICIENT_CREDITS;
          } else {
            return Loan.create({
              serial: helper.randomId(),
              type: 'SHORT_TERM_LOAN',
              number: account.number,
              amount: amount,
              status: 'REQUEST'
            })
              .then(() => {
                return Transaction.create({
                  type: 'SHORT_TERM_LOAN',
                  number: account.number,
                  transTo: '',
                  amount: amount,
                  serial: helper.randomId()
                });
              })
              .then(model => {
                return model.get();
              });
          }
        })
    })
  },
  // 审核贷款申请
  /**
   * clerk:{
   *   number: 
   *   suggestion: FAIL|PASS
   * }
   */
  verifyLoan: (clerk, loan) => {
    return sequelize.transaction(t => {
      return Loan.findOne({ where: { serial: loan.serial }, transaction: t })
        .then(model => {
          let loan = model.get();
          return Account.findOne({ where: { number: clerk.number }, transaction: t })
            .then(model => {
              let account = model.get();
              return Account.update({ balances: account.balances + loan.amount }, { where: { number: loan.number }, transaction: t })
                .then(() => {
                  return Loan.update({ status: 'PASS' }, { where: { serial: loan.serial }, transaction: t })
                    .then(model => {
                      return model.get();
                    });
                });
            });
        });
    });
  },
  // 还款
  payback: (inAccount, inLoan) => {
    return sequelize.transaction(t => {
      return Account.findOne({ where: { number: inAccount.number }, transaction: t })
        .then(model => {
          let account = model.get();
          return Loan.findOne({ where: { serial: inLoan.serial }, transaction: t })
            .then(model => {
              let loan = model.get();
              if (account.balances < loan.amount) {
                throw TransError.INSUFFICIENT_BALANCE;
              } else {
                return Account.update({ balances: account.balances - loan.amount }, { where: { number: account.number }, transaction: t })
                  .then(model => {
                    let updatedAccount = model.get();
                    return Loan.update({ status: 'FINISHED' }, { where: { serial: loan.serial }, transaction: t })
                      .then(model => {
                        return model.get();
                      });
                  });
              };
            });
        });
    });
  },
  viewLoan: () => {
    return Loan.findAll();
  }
}