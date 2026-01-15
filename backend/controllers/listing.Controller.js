import uploadOnCloudinary from "../config/cloudinary.js";
import Listing  from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
    try {
        console.log("Cookies:", req.cookies);
        console.log("UserId:", req.userId);
        console.log("Received listing request:", req.body);
        console.log("Files received:", req.files);
        
        let host = req.userId;
        let { title, description, rent, city, landmark, category } = req.body;
        
        // Check if required fields exist
        if (!title || !description || !rent || !city || !landmark || !category) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }
        
        // Check if files exist
        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All three images are required" });
        }
        
        let image1Result = await uploadOnCloudinary(req.files.image1[0].path);
        let image2Result = await uploadOnCloudinary(req.files.image2[0].path);
        let image3Result = await uploadOnCloudinary(req.files.image3[0].path);

        let listing = await Listing.create({
            title,
             description,
             rent,
             city,
             landmark,
             category,
            image1: image1Result?.url || "",
            image2: image2Result?.url || "",
            image3: image3Result?.url || "",
            host,
        });
        
        let user = await User.findByIdAndUpdate(host, { $push: { listing: listing._id } }, { new: true });
        if (!user) {
             return res.status(400).json({ message: "Host user not found" });
        }
        return res.status(201).json(listing);
    }
    catch (error) {
        res.status(500).json({ message: `Error adding listing: ${error.message}` });
    }
}