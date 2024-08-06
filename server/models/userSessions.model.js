import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserSessions = sequelize.define("UserSessions",
    {
        userId: DataTypes.INTEGER,
        sessionId: DataTypes.STRING(255),

    }, { sequelize }
);

export default UserSessions;