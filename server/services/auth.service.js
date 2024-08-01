import { Op } from "sequelize";
import { Users } from "../models/index.js";
import UserSessions from "../models/userSessions.model.js";


export const authenticateUser = async ({ username, password }) => {
    const user = await Users.findOne({ attributes: ["id", "name", "password"], where: { name: { [Op.like]: username } }, raw: true })
    if (!user) return res.status(404).json("USER DOES NOT EXIST");
    if (user.password!==password) return res.status(404).json("INVALID PASSWORD");

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