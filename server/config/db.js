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
            underscored: true,
            freezeTableName: true,
            timestamps: true,
        },
        pool: {
            max: 50,
            min: 10,
            idle: 10000,
        },
        // options: {
        //     useUTC: false
        // }
        dialectOptions: {
        },
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

