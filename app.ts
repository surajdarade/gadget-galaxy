import express, { Request, Response } from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import session, { SessionOptions } from 'express-session';
import * as mango from 'mongoose';

import user from './routes/user';
import products from './routes/products';
import seller from './routes/seller';

const app = express();
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
mango.connect("mongodb://127.0.0.1:27017/gadgetgalaxy", {
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
    secret: 'mynameissuraj!',
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
