import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categories = sequelize.define("Categories",
    {
        userId: DataTypes.STRING(255),
        name: DataTypes.STRING(255),
        status: { type: DataTypes.ENUM, values: ["0", "1"] },
        recurring: { type: DataTypes.ENUM, values: ["0", "1"] },
        // type : credit/debit

    }, { sequelize }
);

export default Categories;
