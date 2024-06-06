import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    console.log(req.headers)
    console.log("req.body", req.body)
    console.log("req.query", req.query)
    return res.json({ message: "hi" })
})

export default router;