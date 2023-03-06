import express from "express";
import {ForgetPassword, Login, resetPassword, verif, getEmployee, add} from "../Controller/Employee.js";

const router = express.Router();

router
    .post("/Login",Login)
    .post("/forget",ForgetPassword)
    .post("/test",verif)
    .post("/reset",resetPassword)
    .post("/home",getEmployee)
    .post('/add',add)
export default router;
