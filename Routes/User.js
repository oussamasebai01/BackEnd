import express from "express";
import {Register,Login} from '../Controller/User.js'

const router = express.Router();

router
    .route("/Register")
    .post(Register)
router
    .post("/Login",Login)

export default router;