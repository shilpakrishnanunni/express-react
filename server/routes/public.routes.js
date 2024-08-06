import { Router } from "express";
import { loginLimiter } from "../middleware/loginLimiter.middleware.js";
import { login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginLimiter, login);

router.post("/signup", (req, res, next) => {
    console.log("SIGNUP")
    return res.status(200).json({ success: true });
});
router.post("/forgot-password", (req, res, next) => {
    console.log("FORGOT PASSWORD")
    return res.status(200).json({ success: true });
});

router.post("/logout", logout);


export default router;