    import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa"
import { listingDataContext } from '../Context/ListingContext'
import { userDataContext } from '../Context/UserContext'

function ViewCard() {
    let navigate = useNavigate()
    let { cardDetails } = useContext(listingDataContext)
    let { userData } = useContext(userDataContext)
  return (
      <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
        <div className="w-[1005px] min-h-[635px] bg-white rounded-xl border border-gray-200 shadow-sm p-8 relative flex flex-col">
  
          {/* Back Button */}
          <div
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 
                       flex items-center justify-center rounded-full cursor-pointer transition"
          >
            <FaArrowLeft size={16} />
          </div>
  
          {/* Heading */}
          <div className="mt-12 mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {`In ${cardDetails?.landmark?.toUpperCase() || ''}, ${cardDetails?.city?.toUpperCase() || ''}`}
            </h1>
            <p className="text-gray-500 text-sm">Review your listing details.</p>
          </div>
  
          {/* Images */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {cardDetails?.image1 && (
              <div className="col-span-2 h-64 rounded-xl overflow-hidden border">
                <img src={cardDetails?.image1 || ""} alt="Main" className="w-full h-full object-cover" />
              </div>
            )}
            {cardDetails?.image2 && (
              <div className="h-40 rounded-xl overflow-hidden border">
                <img src={cardDetails?.image2 || ""} alt="Second" className="w-full h-full object-cover" />
              </div>
            )}
            {cardDetails?.image3 && (
              <div className="h-40 rounded-xl overflow-hidden border">
                <img src={cardDetails?.image3 || ""} alt="Third" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
  
          {/* Details */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{cardDetails?.title}</h2>
            <p className="text-gray-600">{cardDetails?.description}</p>
            <div className="flex gap-4 text-sm text-gray-500 pt-2">
              <span>Category: {cardDetails?.category}</span>
              <span>Rent: ₹{cardDetails?.rent}</span>
            </div>
          </div>
  
          {/* Button */}
          <div className="mt-auto pt-8 flex justify-end">
            {cardDetails?.host === userData?._id ? (
              <button className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-200 hover:bg-gray-900 cursor-pointer">
                Edit Listing
              </button>
            ) : (
              <button className="bg-[#FF385C] text-white font-bold py-3 px-8 rounded-lg transition duration-200 hover:bg-red-600 cursor-pointer">
                Book Now
              </button>
            )}
          </div>
  
        </div>
      </div>
    )  
   
}

export default ViewCard;