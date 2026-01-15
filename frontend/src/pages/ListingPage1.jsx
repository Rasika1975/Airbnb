import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from '../Context/ListingContext';

function ListingPage1() {
    let navigate = useNavigate();
    let {
       title,setTitle,
    description,setDescription,
    frontEndImage1,setFrontEndImage1,
    frontEndImage2,setFrontEndImage2,
    frontEndImage3,setFrontEndImage3,
    backEndImage1,setBackEndImage1,
    backEndImage2,setBackEndImage2,
    backEndImage3,setBackEndImage3,
    rent,setRent,
    city,setCity,
    landMark,setLandMark,
    category,setCategory,
   

    } = useContext(listingDataContext);
    
    const handleImage1 = (e )=>{
      let file = e.target.files[0];
      setBackEndImage1(file);
      setFrontEndImage1(URL.createObjectURL(file));
    }
    const handleImage2 = (e )=>{
      let file = e.target.files[0];
      setBackEndImage2(file);
      setFrontEndImage2(URL.createObjectURL(file));
    }
    const handleImage3 = (e )=>{
      let file = e.target.files[0];
      setBackEndImage3(file);
      setFrontEndImage3(URL.createObjectURL(file));
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/listingpage2");
    }


  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
      <div className ='w-[1005px] h-auto min-h-[635px] bg-white rounded-xl border border-gray-200 shadow-sm p-8 relative'>
             <div
                    onClick={() => navigate("/")}
                    className="absolute top-6 left-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 
                               flex items-center justify-center rounded-full 
                               cursor-pointer transition"
                  >
                    <FaArrowLeft size={16} />
                  </div>
                  
                  <div className="mt-12 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Setup your home</h1>
                    <p className="text-gray-500 text-sm">Fill in the details below to get started.</p>
                  </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter listing title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rent
              </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Landmark
              </label>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
             Image 1
            </label>
             <input
              type="file"
              onChange={handleImage1}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF385C] file:text-white hover:file:bg-red-600 cursor-pointer"
            />
            </div>
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
             Image 2
            </label>
             <input
              type="file"
              onChange={handleImage2}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF385C] file:text-white hover:file:bg-red-600 cursor-pointer"
            />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
             Image 3
            </label>
             <input
              type="file"
              onChange={handleImage3}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF385C] file:text-white hover:file:bg-red-600 cursor-pointer"
            />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#FF385C] hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Next
            </button>
          </div>
        </form>
    </div>
    </div>
  )
}

export default ListingPage1
