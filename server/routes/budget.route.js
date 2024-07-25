import { Router } from "express";
import { addCategory, alterBudget, getBudgetDashboard, selectCategory } from "../controllers/budget.controller.js";

const router = Router();

router.get("/", getBudgetDashboard);
router.post("/add-category", addCategory);
router.patch("/alter-budget", alterBudget);
router.patch("/select-category", selectCategory)

export default router;