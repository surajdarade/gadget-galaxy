import express, { Request, Response } from 'express';
import Users from '../models/user';
import Computers from '../models/computers';
import Accessories from '../models/accessories';
import Laptops from '../models/laptops';
import Cart from '../models/cart';
import { requireLogin } from '../middleware';
import { Session } from 'express-session'; // Import the Session type

interface UserSession extends Session {
    user_id?: string;
}

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.render('home', { message: null });
});

router.get("/about", (_req: Request, res: Response) => {
    res.render("about");
});

router.get("/contact", (_req: Request, res: Response) => {
    res.render("contact");
});

router.get("/laptops", async (_req: Request, res: Response) => {
    const prods = await Laptops.find({});
    res.render("laptops", { laptops: prods });
});

router.get("/computers", async (_req: Request, res: Response) => {
    const prods = await Computers.find({});
    res.render("computers", { computers: prods });
});

router.get("/accessories", async (_req: Request, res: Response) => {
    const prods = await Accessories.find({});
    res.render("accessories", { accessories: prods });
});

router.post("/accessories", requireLogin, async (req: Request, res: Response) => {
    const user = await Users.findById((req.session as UserSession)?.user_id);
    const { name, price, quantity, image } = req.body;
    const k = new Cart({ useremail: user?.email, name, price, quantity, image });
    k.save();
    res.redirect('/mycart');
});

router.post("/laptops", requireLogin, async (req: Request, res: Response) => {
    const user = await Users.findById((req.session as UserSession)?.user_id);
    const { name, price, quantity, image } = req.body;
    const k = new Cart({ useremail: user?.email, name, price, quantity, image });
    k.save();
    res.redirect('/mycart');
});

router.post("/computers", requireLogin, async (req: Request, res: Response) => {
    const user = await Users.findById((req.session as UserSession)?.user_id);
    const { name, price, quantity, image } = req.body;
    const k = new Cart({ useremail: user?.email, name, price, quantity, image });
    k.save();
    res.redirect('/mycart');
});

export default router;
