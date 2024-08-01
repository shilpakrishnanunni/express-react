import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);

router.post("/signup", (req, res, next) => {
    console.log("SIGNUP")
    return res.status(200).json({ success: true });
});
router.post("/forgot-password", (req, res, next) => {
    console.log("FORGOT PASSWORD")
    return res.status(200).json({ success: true });
});


export default router;