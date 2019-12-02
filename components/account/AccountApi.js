/**
 * 
 */
const service = require('./AccountService');
const router = require('express').Router();

/**
 * 根据账号查找账户
 */
router.get('/:number',(req,res,next)=>{
  service
  .findByNumber(req.params.number)
  .then(account=>{
    res.send(account);
  })
  .catch(error=>{
    next(error);
  });
});

/**
 * 查找所有账户
 */
router.get('', (req, res, next) => {
  service
  .findAll()
  .then(accounts=>{
    res.send(accounts);
  })
  .catch(error=>{
    next(error);
  });
});

/**
 * 新建账户
 */
router.post('/',(req,res,next)=>{
  service
  .create({
    name:req.body.name,
    number:req.body.number,
    balances:req.body.balances
  })
  .then(account=>{
    res.send(account);
  })
  .catch(error=>{
    next(error);
  });
});

/**
 * 修改账户资料
 */
router.put('/',(req,res,next)=>{
  let inAccount = {
    number: req.body.account.number,
    pin: req.body.account.pin
  };
  service
  .update(inAccount)
  .then(account=>{
    res.send(account);
  })
  .catch(error=>{
    next(error);
  });
})

module.exports = router;