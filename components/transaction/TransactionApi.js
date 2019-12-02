const service = require('./TransactionService');

const router = require('express').Router();

router.post('/withdrawal', (req, res, next) => {
  service
    .withdrawal({
      number: req.body.account.number
    }, req.body.amount)
    .then(transaction => {
      res.send(transaction);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/deposit', (req, res, next) => {
  console.log(req.body);
  service
    .deposit({
      number: req.body.account.number
    }, req.body.amount)
    .then(transaction => {
      res.send(transaction);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/transfer', (req, res, next) => {
  service
    .transfer({
      number: req.body.from.number
    }, {
      number: req.body.to.number
    }, req.body.amount)
    .then(transaction => {
      res.send(transaction);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/loan', (req, res, next) => {
  service
    .requestLoan({ number: req.body.number }, req.body.amount)
    .then(transaction => {
      res.send(transaction);
    })
    .catch(error => {
      next(error);
    });
});

router.put('/loan', (req, res, next) => {
  let clerk = {
    number: req.body.number,
    suggestion: req.body.suggestion
  };
  let loan = {
    serial: req.body.loan.serial
  };
  service
    .verifyLoan(clerk, loan)
    .then(loan => {
      res.send(loan);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/loan',(req, res, next) => {
  service.viewLoan().then(loans=>{
    res.send(loans);
  }).catch(error=>{
    next(error);
  })
});

router.post('/payback', (req, res, next) => {
  let account = {
    number: req.body.account.number
  };
  let loan = {
    serial: req.body.loan.serial
  };
  service
    .payback(account, loan)
    .then(loan => {
      res.send(loan);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;