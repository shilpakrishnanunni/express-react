import { Router } from "express";

const router = Router();

router.post("/login", (req, res, next) => {
    console.log("here")
    return res.status(200).json({ success: true });
});
router.post("/signup", (req, res, next) => {
    console.log("SIGNUP")
    return res.status(200).json({ success: true });
});
router.post("/forgot-password", (req, res, next) => {
    console.log("FORGOT PASSWORD")
    return res.status(200).json({ success: true });
});


export default router;