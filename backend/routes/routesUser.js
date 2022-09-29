const express = require("express");
const router = express.Router();
const limiter = require("../middleware/rateLimit");
const validatorEmail = require("../middleware/validatorEmail");
const validatorPassword = require('../middleware/validatorPassword');

const userController = require("../controllers/controllUser");

router.post("/signup", validatorEmail, validatorPassword, userController.signup);
router.post("/login", limiter, userController.login);

module.exports = router;
