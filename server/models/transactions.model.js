import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Transactions = sequelize.define("transactions",
    {
        description: DataTypes.STRING(255),
        amount: DataTypes.DOUBLE(10, 4),
        category: DataTypes.TINYINT,
        type: DataTypes.STRING(10)

    }, { sequelize }
);

export default Transactions;
