import { Router } from "express";
import Transactions from "../models/transactions.model.js";

const router = Router();

router.get("/", (req, res) => {
    console.log("reached GET /home")
    return res.json({ message: "hi" })
})

router.post("/add-transaction", async (req, res) => {
    console.log(req.body);
    await Transactions.create({ 
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
        type: req.body.type
    })
    res.json({ response: "Transaction added to db." })
})

router.get("/transaction-history", async (req, res) => {
    const transactions = await Transactions.findAll({
        attributes: ["description", "amount", "category", "type", "createdAt"],
        order: [["createdAt", "DESC"]]
    });
    const data = transactions.map((txn) => ({
        description: txn.description,
        amount: txn.amount,
        category: txn.category,
        type: txn.type,
        createdAt: txn.createdAt
    }))
    console.log(data)
    res.json({ data });
})

export default router;