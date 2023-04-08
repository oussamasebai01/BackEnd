import express from "express";
import {save} from "../Controller/Condidat.js";

const router = express.Router();

router
    .post("/save",save)

export default router;
