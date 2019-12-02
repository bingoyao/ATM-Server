const service = require('./AuthService');
const router = require('express').Router();

/**
 * 请求携带认证信息
 * {
 *   number,
 *   pin
 * }
 */
router.post('/', (req, res, next) => {
  let account = req.body.account;
  service.login(account).then(tokenObj=>{
    res.json({
      token: tokenObj
    });
  }).catch(error=>{
    next(error);
  });
});

module.exports = router;