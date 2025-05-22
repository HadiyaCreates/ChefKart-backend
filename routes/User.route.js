const { UserSignUp, UserLogin } = require('../controller/User.controller');

const router = require('express').Router();

router.post('/signup' , UserSignUp);
router.post('/login', UserLogin);


module.exports = router