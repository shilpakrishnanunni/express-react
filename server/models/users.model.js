import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Users = sequelize.define("Users",
    {
        name: DataTypes.STRING(255),
        password: DataTypes.STRING(255),
        budget: DataTypes.DOUBLE(10,2),

    }, { sequelize }
);

export default Users;
