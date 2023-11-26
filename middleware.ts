import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';

interface CustomSession extends Session {
    user_id?: string; // Adjust the type based on your actual implementation
}

export const requireLogin = (req: Request & { session: CustomSession }, res: Response, next: NextFunction) => {
    if (!req.session?.user_id) {
        return res.render('login', { message: "You have to login first" });
    }
    next();
};
