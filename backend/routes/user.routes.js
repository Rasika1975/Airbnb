import express from 'express';
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from '../controllers/user.controller.js';


let userRouter = express.Router();///iske through request karge
//get requse karge
userRouter.get("/current-user", isAuth, getCurrentUser); //middleware isAuth use karge before getCurrentUser controller

export default userRouter;