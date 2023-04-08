import express from "express";
import {Login} from "../Controller/Employee.js";
import {add, get, getAll, put, put2} from "../Controller/Congee.js";

const router = express.Router();

router
    .post("/Request",add)
    .get("/get/:id",get)
    .put("/Update",put)
    .get('/get',getAll)
    .put("/put",put2)


export default router;
