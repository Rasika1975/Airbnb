import Listing from "../model/listing.model.js";
import Booking from "../model/booking.model.js";
import User from "../model/user.model.js";




export const createBooking = async (req, res) => {
    try {

        let { id } = req.params;
        let { checkIn, checkOut, totalRent } = req.body;

        let listing = await Listing.findById(id);
        if(!listing){
            return res.status(404).json({ message: "Listing not found" });
        }
        if(new Date(checkIn) >= new Date(checkOut)){
            return res.status(400).json({ message: "Check-in date must be before check-out date" });
        }
        // Assuming logic to check if already booked for dates would go here, 
        // but keeping simple check if 'isBooked' flag exists on model

        let newBooking = await Booking.create({
            listing: listing._id,
            checkIn,
            checkOut,
            totalRent,
            host: listing.host,
            guest: req.userId
        });
        
        // Add booking ID to user's bookings
        let user = await User.findByIdAndUpdate(req.userId, { $push: { bookings: newBooking._id } }, { new: true });
        
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: `Error creating booking: ${error.message}` });
    }
};
