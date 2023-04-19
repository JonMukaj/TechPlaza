const express = require('express');
const Authorization = require('../presentation/controllers/AuthorizationController');

const router = express.Router();
const authoController = new Authorization();

router.post('/login', authoController.loginUser.bind(authoController));
router.post('/register', authoController.signUp.bind(authoController));

module.exports = router;
