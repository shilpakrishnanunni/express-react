import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
    return res.json("IN PROGRESS")
})

router.post("/add-category", async (req, res) => {
    console.log("----/add-category----")
    console.log(req.body)
    return res.status(200);
})

export default router;