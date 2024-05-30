const passport = require('passport')
const express = require('express')
const checkRoles = require("../middleware/checkRole");
const {register, login} = require('../controller/authController')

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;