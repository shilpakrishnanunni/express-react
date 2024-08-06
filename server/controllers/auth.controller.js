import UserSessions from "../models/userSessions.model.js";
import service from "../services/index.js";


export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await service.authenticateUser({ username, password });

        req.session.userId = user.id;
        
        await service.storeSessionInDB({ userId: user.id, sessionId: req.session.id });
        return res.status(200).json({ success: true, user: { id: user.id, username: user.name } });
    } catch (error) {
        console.log("ERROR FROM login", error);
        return res.status(401).json({ success: false, message: "Invalid username or password." });
    }
};

export const logout = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        await req.session.destroy();
        res.clearCookie('connect.sid');
        await UserSessions.destroy({ where: { userId } });
        res.json({ message: "SUCCESS" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
