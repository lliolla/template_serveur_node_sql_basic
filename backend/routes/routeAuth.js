// creation d'un router
const express= require('express');
const router = express.Router();

const authCtrl = require('../controllers/ctrlAuth')


//routes d'authentification

router.post('/register',authCtrl.register);//create user
router.post('/loging',authCtrl.loging); // logging user

module.exports = router

