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
        if(listing.isBooked){
            return res.status(400).json({ message: "This listing is already booked" });
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
        
        listing.isBooked = true;
        await listing.save();
        
        // Add booking ID to user's bookings
        let user = await User.findByIdAndUpdate(req.userId, { $push: { bookings: newBooking._id } }, { new: true });
        
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        await newBooking.populate("listing");
        
        return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: `Error creating booking: ${error.message}` });
    }
};

export const cancelBooking = async (req, res) => {  
    try {
        const { id } = req.params; // This is the booking ID
        const userId = req.userId;

        // 1. Find the booking
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 2. Authorize: only the guest who made the booking can cancel it
        if (booking.guest.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to cancel this booking." });
        }

        // 3. Update the associated listing to be available again
        await Listing.findByIdAndUpdate(booking.listing, { isBooked: false });

        // 4. Remove booking from user's bookings array
        await User.findByIdAndUpdate(userId, { $pull: { bookings: id } });

        // 5. Delete the booking document itself
        await Booking.findByIdAndDelete(id);

        return res.status(200).json({ message: "Booking cancelled successfully" });
    } catch(error) {
        res.status(500).json({ message: `Error cancelling booking: ${error.message}` });
    }
};
