import { Sequelize } from "sequelize";

import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT || 3306,
        dialect: "mysql",
        // logging: false,
        define: {
            underscored: false,
            freezeTableName: true,
            timestamps: true,
        },
        pool: {
            max: 50,
            min: 10,
            idle: 10000,
        },
        options: {
            // raw: true,
            useUTC: false
        },
        dialectOptions: {
            timezone: "+00:00", // for reading from db
        },
        // timezone: "+00:00" // for writing to db
    }
);

export const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection successful.")
    } catch (error) {
        console.log("Database connection failed.")
        throw error;
    }
} 

export default sequelize;