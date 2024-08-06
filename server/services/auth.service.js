import { Op } from "sequelize";
import { Users } from "../models/index.js";
import bcrypt from 'bcrypt';
import UserSessions from "../models/userSessions.model.js";


export const authenticateUser = async ({ username, password }) => {
    const user = await Users.findOne({ attributes: ["id", "name", "password"], where: { name: { [Op.like]: username } }, raw: true });

    if (!user) throw new Error("Invalid credentials.");
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials. - password");

    return user;
}

export const storeSessionInDB = async ({ userId, sessionId }) => {
    console.log(userId, sessionId)
    await UserSessions.create({
        userId,
        sessionId
    }, {
        updateOnDuplicate: ["user_id"]
    });
}