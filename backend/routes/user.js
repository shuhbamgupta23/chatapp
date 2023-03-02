import express from "express";
import { signIn, signUp, allUser, getFriend } from "../controller/user.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/allUsers", allUser)
router.get("/getFriend/:searchName", getFriend);

export default router;
