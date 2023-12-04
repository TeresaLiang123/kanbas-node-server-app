import express from 'express'
import HeLLo from './hello.js'
import Lab5 from "./lab5.js"
import mongoose from "mongoose";
import UserRoutes from './users/routes.js';
import session from "express-session";
import cors from "cors";
import "dotenv/config";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express()
Lab5(app)
HeLLo(app)
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
 );
 const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

UserRoutes(app);
app.listen(4000)