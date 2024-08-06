import { Router } from "express";
import Transactions from "../models/transactions.model.js";
import { Op, Sequelize } from "sequelize";
import { convertToLocalTZ, convertToUTC } from "../utils/date-tz.js";

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
        order: [["createdAt", "DESC"]],
        limit: 5
    });
    const data = transactions.map((txn) => ({
        description: txn.description,
        amount: txn.amount,
        category: 1,
        type: txn.type,
        createdAt: convertToLocalTZ(txn.createdAt)
    }))
    res.json({ data });
})

router.get("/total-income-expense", async (req, res) => {
    const today = new Date();
    const firstDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1, 0, 0, 0));
    const lastDay = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59));

    const totalData = await Transactions.findOne({
        attributes: [
            [Sequelize.literal('SUM(CASE WHEN type="credit" THEN `amount` ELSE 0 END)'),'totalCredit'],
            [Sequelize.literal('SUM(CASE WHEN type="debit" THEN `amount` ELSE 0 END)'),'totalDebit']
        ],
        raw: true
    })
    const monthData = await Transactions.findOne({
        attributes: [
            [Sequelize.literal('SUM(CASE WHEN type="credit" THEN `amount` ELSE 0 END)'),'totalCredit'],
            [Sequelize.literal('SUM(CASE WHEN type="debit" THEN `amount` ELSE 0 END)'),'totalDebit']
        ],
        where: { createdAt: { [Op.between]: [ firstDay, lastDay ] } },
        raw: true
    });
    res.json({ 
        totalSavings: (Number(totalData.totalCredit) > Number(totalData.totalDebit)) ? Number(totalData.totalCredit) - Number(totalData.totalDebit) : 0,
        monthIncome: monthData.totalCredit ?? 0,
        monthDebit: monthData.totalDebit ?? 0
    });
})

export default router;