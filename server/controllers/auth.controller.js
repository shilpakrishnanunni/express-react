import service from "../services/index.js";


export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await service.authenticateUser({ username, password });
        console.log("USR", user, user.id, user['id'])

        req.session.userId = user.id;
        
        await service.storeSessionInDB({ userId: user.id, sessionId: req.session.id });
        return res.status(200).json({ success: true, user: { username: user.name } });
    } catch (error) {
        console.log("ERROR FROM login", error);
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        await req.session.destroy();
        res.clearCookie('connect.sid');
        res.json({ message: "SUCCESS" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
