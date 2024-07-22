import { Router } from "express";
import { addCategory, getBudgetDashboard } from "../controllers/budget.controller.js";

const router = Router();

router.get("/", getBudgetDashboard);
router.post("/add-category", addCategory);

export default router;