import express from "express";
import {Login} from "../Controller/Employee.js";
import {add} from "../Controller/Congee.js";

const router = express.Router();

router
    .post("/Request",add)

export default router;
