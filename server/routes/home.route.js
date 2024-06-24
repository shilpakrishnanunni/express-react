import { Router } from "express";
import moment from 'moment';
import Transactions from "../models/transactions.model.js";
import { Sequelize } from "sequelize";

const router = Router();

router.get("/", (req, res) => {
    console.log("reached GET /home")
    return res.json({ message: "hi" })
})

router.post("/add-transaction", async (req, res) => {
    console.log("req.body",req.body);
    await Transactions.create({ 
        description: req.body.description,
        amount: req.body.amount,
        category: 1,
        type: req.body.type
    })
    res.json({ status:true, response: "Transaction added to db." })
})

router.get("/transaction-history", async (req, res) => {
    const transactions = await Transactions.findAll({
        attributes: ["description", "amount", "category", "type", "createdAt"],
        order: [["createdAt", "DESC"]]
    });
    const data = transactions.map((txn) => ({
        description: txn.description,
        amount: txn.amount,
        category: 1,
        type: txn.type,
        createdAt: moment(txn.createdAt).format('DD-MM-YYYY')
    }))
    res.json({ data });
})

router.get("/total-income-expense", async (req, res) => {
    const data = await Transactions.findOne({
        attributes: [
            [Sequelize.literal('SUM(CASE WHEN type="credit" THEN `amount` ELSE 0 END)'),'totalCredit'],
            [Sequelize.literal('SUM(CASE WHEN type="debit" THEN `amount` ELSE 0 END)'),'totalDebit']
        ]
    })
    res.json({ data });
})

export default router;