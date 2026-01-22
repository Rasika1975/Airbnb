import React, { useContext } from "react";
import Nav from "../components/Nav";
import { userDataContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom'

function MyBooking() {
  let navigate = useNavigate()
  const { userData, loading } = useContext(userDataContext);
  const myBookings = userData?.bookings || [];

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Nav />
      <div className="w-full min-h-screen pb-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-gray-600 mb-8">
            These are the properties you have booked.
          </p>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {myBookings.length > 0 ? (
                myBookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        className="h-full w-full object-cover" 
                        src={booking.listing?.image1 || "https://via.placeholder.com/300"} 
                        alt={booking.listing?.title} 
                      />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="uppercase tracking-wide text-sm text-[#FF385C] font-semibold">
                          {booking.listing?.city}, {booking.listing?.landmark}
                        </div>
                        <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                          {booking.listing?.title}
                        </h2>
                        <p className="mt-2 text-gray-500">
                          {booking.listing?.description?.substring(0, 150)}...
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-700">
                           <div className="flex flex-col">
                                <span className="font-semibold">Check-in:</span>
                                <span>{formatDate(booking.checkIn)}</span>
                           </div>
                           <div className="flex flex-col mt-2 sm:mt-0">
                                <span className="font-semibold">Check-out:</span>
                                <span>{formatDate(booking.checkOut)}</span>
                           </div>
                           <div className="flex flex-col mt-2 sm:mt-0">
                                <span className="font-semibold">Total Rent:</span>
                                <span className="font-bold text-lg text-gray-900">₹{booking.totalRent}</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700">No Bookings Yet</h2>
                  <p className="text-gray-500 mt-2">
                    You haven't booked any properties. Start exploring to find your next stay!
                  </p>
                  <Link to="/" className="mt-6 inline-block bg-[#FF385C] text-white font-bold py-3 px-6 rounded-lg transition duration-200 hover:bg-red-600">
                    Explore Listings
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBooking;
