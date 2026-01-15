import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from '../Context/ListingContext';
import { TbBuildingPavilion } from "react-icons/tb";
import { PiFarm } from "react-icons/pi";
import { MdOutlinePool, MdBedroomParent } from "react-icons/md";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { HiBuildingStorefront } from "react-icons/hi2";

function ListingPage2() {
    let navigate = useNavigate();
    const { category, setCategory } = useContext(listingDataContext);

    const categories = [
        { label: "Villa", icon: <TbBuildingPavilion size={30} /> },
        { label: "Farmhouse", icon: <PiFarm size={30} /> },
        { label: "Pool house", icon: <MdOutlinePool size={30} /> },
        { label: "Rooms", icon: <MdBedroomParent size={30} /> },
        { label: "Flat", icon: <BiSolidBuildingHouse size={30} /> },
        { label: "PG", icon: <IoBedOutline size={30} /> },
        { label: "Cabin", icon: <GiWoodCabin size={30} /> },
        { label: "Shops", icon: <HiBuildingStorefront size={30} /> },
    ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
        <div className ='w-[1005px] h-auto min-h-[635px] bg-white rounded-xl border border-gray-200 shadow-sm p-8 relative flex flex-col'>
                     <div
                            onClick={() => navigate("/listingpage1")}
                            className="absolute top-6 left-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 
                                       flex items-center justify-center rounded-full 
                                       cursor-pointer transition"
                          >
                            <FaArrowLeft size={16} />
                          </div>
                          
                          <div className="mt-12 mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Which of these best describes your place?</h1>
                            <p className="text-gray-500 text-sm">Select a category.</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map((cat, index) => (
                                <div 
                                    key={index}
                                    onClick={() => setCategory(cat.label)}
                                    className={`flex flex-col items-center justify-center h-32 border rounded-xl cursor-pointer transition hover:border-black hover:bg-gray-50
                                        ${category === cat.label ? 'border-2 border-black bg-gray-50' : 'border-gray-200'}
                                    `}
                                >
                                    <div className="mb-2 text-gray-600">{cat.icon}</div>
                                    <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                                </div>
                            ))}
                          </div>

                          <div className="mt-auto pt-8 flex justify-end">
                            <button
                                disabled={!category}
                                onClick={() => navigate("/listingpage3")}
                                className={`font-bold py-3 px-8 rounded-lg transition duration-200
                                    ${category ? "bg-[#FF385C] hover:bg-red-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                                `}
                            >
                                Next
                            </button>
                          </div>
    </div>
    </div>
  )
}

export default ListingPage2
