import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa"
import { listingDataContext } from '../Context/ListingContext'
import { userDataContext } from '../Context/UserContext'
import { RxCross1 } from "react-icons/rx";

function ViewCard() {
    let navigate = useNavigate()
    let { cardDetails, 
          title, setTitle,
          description, setDescription,
          rent, setRent,
          city, setCity,
          landMark, setLandMark,
          setBackEndImage1, setFrontEndImage1,
          setBackEndImage2, setFrontEndImage2,
          setBackEndImage3, setFrontEndImage3,
    } = useContext(listingDataContext)
    let { userData } = useContext(userDataContext)
    const [updatepopup, setUpdatepopup] = useState(false)

    useEffect(() => {
      if (updatepopup && cardDetails) {
        setTitle(cardDetails.title || "");
        setDescription(cardDetails.description || "");
        setRent(cardDetails.rent || "");
        setCity(cardDetails.city || "");
        setLandMark(cardDetails.landmark || "");
      }
    }, [updatepopup, cardDetails, setTitle, setDescription, setRent, setCity, setLandMark]);

    const handleImage1 = (e) => {
      let file = e.target.files[0];
      setBackEndImage1(file);
      setFrontEndImage1(URL.createObjectURL(file));
    }
    const handleImage2 = (e) => {
      let file = e.target.files[0];
      setBackEndImage2(file);
      setFrontEndImage2(URL.createObjectURL(file));
    }
    const handleImage3 = (e) => {
      let file = e.target.files[0];
      setBackEndImage3(file);
      setFrontEndImage3(URL.createObjectURL(file));
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your update logic here
      console.log("Updating listing...");
      setUpdatepopup(false);
    }

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
              <button className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-200 hover:bg-gray-900 cursor-pointer" onClick={() => setUpdatepopup(true)}>
                Edit Listing
              </button>
            ) : (
              <button className="bg-[#FF385C] text-white font-bold py-3 px-8 rounded-lg transition duration-200 hover:bg-red-600 cursor-pointer">
                Book Now
              </button>
            )}
          </div>
          {/* Update listing page */}
          {updatepopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
                
                {/* Close Button */}
                <button 
                  onClick={() => setUpdatepopup(false)}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition z-10"
                >
                  <RxCross1 size={24} />
                </button>

                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Listing</h2>
                  <p className="text-gray-500 text-sm mb-8">Update your property details below.</p>
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        placeholder="Enter listing title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        rows="4"
                        placeholder="Enter listing description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition resize-none"
                      />
                    </div>

                    {/* Grid Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rent</label>
                        <input
                          type="number"
                          placeholder="Enter rent amount"
                          value={rent}
                          onChange={(e) => setRent(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark</label>
                        <input
                          type="text"
                          placeholder="Nearby landmark"
                          value={landMark}
                          onChange={(e) => setLandMark(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image 1</label>
                        <input
                          type="file"
                          onChange={handleImage1}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF385C] file:text-white hover:file:bg-red-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image 2</label>
                        <input
                          type="file"
                          onChange={handleImage2}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF385C] file:text-white hover:file:bg-red-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image 3</label>
                        <input
                          type="file"
                          onChange={handleImage3}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF385C] file:text-white hover:file:bg-red-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setUpdatepopup(false)}
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#FF385C] hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
  
        </div>
      </div>
    )  
   
}

export default ViewCard;