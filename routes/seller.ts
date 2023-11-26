import { Request, Response, Router } from 'express';
import Users from '../models/user';
import Accessories from '../models/accessories';
import Laptops from '../models/laptops';
import Computers from '../models/computers';
import { requireLogin } from '../middleware';
import { Session } from 'express-session';

interface UserSession extends Session {
    user_id?: string;
}

const router = Router();

router.get("/additem", requireLogin, async (req: Request, res: Response) => {
    const user = await Users.findById((req.session as UserSession)?.user_id);

    if (user?.acctype === 'seller') {
        return res.render('additem');
    }

    res.render('home', { message: "To add a product, you have to be logged in with a seller account" });
});

router.post("/additem", (req: Request, res: Response) => {
    const userSession = req.session as UserSession;

    if (userSession.user_id) {
        if (req.body.sect === "accessories") {
            const { name, price, image } = req.body;
            const k = new Accessories({ name, price, image });
            k.save();
            return res.render('home', { message: "Item Added" });
        }

        if (req.body.sect === "laptops") {
            const { name, price, image } = req.body;
            const k = new Laptops({ name, price, image });
            k.save();
            return res.render('home', { message: "Item Added" });
        }

        if (req.body.sect === "computers") {
            const { name, price, image } = req.body;
            const k = new Computers({ name, price, image });
            k.save();
            return res.render('home', { message: "Item Added" });
        }
    }

    res.render('home', { message: "User not logged in" });
});

export default router;
