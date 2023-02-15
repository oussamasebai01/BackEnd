const express = require('express');

const Register = require ("../Controller/User")
const Login = require ("../Controller/User")

const router = express.Router();

router
    .post("/Register",Register)
router
    .post("/Login",Login)

module.exports = router;