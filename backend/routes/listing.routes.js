import express from 'express';
import { addListing } from '../controllers/listing.Controller.js';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';
 
const listingRouter = express.Router();

listingRouter.post('/add', isAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]), addListing);

export default listingRouter;