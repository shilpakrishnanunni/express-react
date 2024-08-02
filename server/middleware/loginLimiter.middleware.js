import { rateLimit } from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    limit: 10,
    message: { success: false, message: "Login attempt limit exceeded."}
});

