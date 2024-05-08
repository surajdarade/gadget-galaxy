import express from 'express';
import bodyParser from 'body-parser';
import session, { SessionOptions } from 'express-session';

import user from './routes/user';
import products from './routes/products';
import seller from './routes/seller';
import dotenv from 'dotenv';



const app = express();

dotenv.config();

app.set('view engine', 'ejs');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

interface SessionConfig extends SessionOptions {
    cookie: {
        httpOnly: boolean;
        expires: Date; // Change type to Date
        maxAge: number;
    };
}

const sessionConfig: SessionConfig = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use('/', user);
app.use('/', seller);
app.use('/', products);

app.listen(8000, () => {
    console.log("Server started at 8000");
});
