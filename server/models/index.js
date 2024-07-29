import Categories from "./categories.model.js";
import MonthlyBudget from "./monthlyBudget.js";
import Transactions from "./transactions.model.js";
import Users from "./users.model.js";

MonthlyBudget.belongsTo(Categories, { foreignKey: "categoryId" });

export {
    Categories,
    MonthlyBudget,
    Transactions,
    Users,
}