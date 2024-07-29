import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MonthlyBudget = sequelize.define("MonthlyBudget",
    {
        userId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        totalAmount: DataTypes.DOUBLE(10,2),
        amountLeft: DataTypes.DOUBLE(10,2),

    }, { sequelize }
);

export default MonthlyBudget;
