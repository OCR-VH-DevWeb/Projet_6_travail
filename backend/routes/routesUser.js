const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// const userController = require('../controllers/controllUser');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;