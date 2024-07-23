import { Router } from "express";
import { addCategory, alterBudget, getBudgetDashboard } from "../controllers/budget.controller.js";

const router = Router();

router.get("/", getBudgetDashboard);
router.post("/add-category", addCategory);
router.patch("/alter-budget", alterBudget);

export default router;