const { UserSignUp, UserLogin, getAllUsers } = require('../controller/User.controller');

const router = require('express').Router();

router.post('/signup' , UserSignUp);
router.post('/login', UserLogin);
router.get('/all', getAllUsers);


module.exports = router