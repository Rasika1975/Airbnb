import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createBooking } from "../controllers/booking.controller.js";
import { cancelBooking } from "../controllers/booking.controller.js";



let bookingRouter = express.Router();

bookingRouter.post("/create/:id", isAuth, createBooking);
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking);


export default bookingRouter;
