import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Session, SessionData } from 'express-session'; // Import the Session types

import Users from '../models/user';
import Cart from '../models/cart';
import { requireLogin } from '../middleware';

interface UserSession extends SessionData {
    user_id?: string;
}

const router = express.Router();

router.get("/signup", (req: Request, res: Response) => {
    if ((req.session as UserSession)?.user_id) {
        return res.render("temp", { message: "Already Logged In" });
    } else {
        return res.render("signup");
    }
});

router.post("/signup", (req: Request, res: Response) => {
    const { acctype, name, email, password } = req.body;
    const hash2 = bcrypt.hashSync(password, 10);
    const newUser = new Users({ acctype, name, email, password: hash2 });
    newUser.save();
    return res.render('home', { message: "New User created Successfully" });
});

router.get("/login", (req: Request, res: Response) => {
    if ((req.session as UserSession)?.user_id) {
        return res.render("temp", { message: "Already Logged In" });
    } else {
        return res.render("login", { message: null });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const { acctype, email, password } = req.body;
    const user = await Users.findOne({ email, acctype });

    if (!user) {
        return res.render('temp', { message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        (req.session as UserSession).user_id = user._id;
        return res.render('home', { message: null });
    } else {
        return res.render('temp', { message: "Wrong Credentials" });
    }
});

router.get("/profile", requireLogin, async (req: Request, res: Response) => {
    const user = await Users.findById((req.session as UserSession).user_id);
    return res.render('profile', { loggedUser: user });
});

router.post("/logout", (req: Request, res: Response) => {
    (req.session as UserSession).user_id = undefined;
    return res.render('home', { message: "User Logged Out" });
});

router.get("/mycart", requireLogin, async (req: Request, res: Response) => {
    const user = await Users.findById((req.session as UserSession).user_id);
    const prods = await Cart.find({ useremail: user?.email });
    return res.render("mycart", { mcart: prods, user });
});

router.get("/invoice", requireLogin, async (req: Request, res: Response) => {
    const user = await Users.findById((req.session as UserSession).user_id);
    const prods = await Cart.find({ useremail: user?.email });
    return res.render("invoice", { mcart: prods, user });
});

export default router;
