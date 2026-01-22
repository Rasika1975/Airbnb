import React, { useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot, MdOutlinePool, MdBedroomParent } from "react-icons/md";
import { TbBuildingPavilion } from "react-icons/tb";
import { PiFarm } from "react-icons/pi";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { HiBuildingStorefront } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from '../Context/AuthContext'; 
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  let {serverUrl} = useContext(authDataContext);
  let [cate, setCate] = useState("");
  let {userData, setUserData} = useContext(userDataContext);
  let{listingData, setListingData, newListData, setNewListData} = useContext(listingDataContext)
  
  const navigate = useNavigate();

  const categories = [
    { label: "Trending", icon: <MdWhatshot /> },
    { label: "Villa", icon: <TbBuildingPavilion /> },
    { label: "Farmhouse", icon: <PiFarm /> },
    { label: "Pool house", icon: <MdOutlinePool /> },
    { label: "Rooms", icon: <MdBedroomParent /> },
    { label: "Flat", icon: <BiSolidBuildingHouse /> },
    { label: "PG", icon: <IoBedOutline /> },
    { label: "Cabin", icon: <GiWoodCabin /> },
    { label: "Shops", icon: <HiBuildingStorefront /> },
  ];

  const handleLogout = async () => {
    try {
      let result = await axios.post(`${serverUrl}/api/auth/logout`, {}, {withCredentials: true});
      setUserData(null);
      setIsOpen(false);
      navigate("/");
    }
    catch (error) {
      console.log("error", error);
    }
  
  };
  const handleCategory = (category) => {
    setCate(category);
    // Handle special case for 'Trending' - show all listings
    if (category === 'Trending') {
      // Reset to show all listings
      if (newListData && newListData.length > 0) {
        setNewListData(newListData);
      } else if (listingData && listingData.length > 0) {
        setNewListData(listingData);
      }
    } else {
      // Filter listings by category
      if (newListData && newListData.length > 0) {
        const filteredListings = newListData.filter((list) => list.category === category);
        setNewListData(filteredListings);
      } else if (listingData && listingData.length > 0) {
        // Fallback to original listingData if newListData is not available
        const filteredListings = listingData.filter((list) => list.category === category);
        setNewListData(filteredListings);
      }
    }
  };

  return (
    <div className="w-full bg-white sticky top-0 z-50">
      <nav className="w-full h-[80px] border-b border-gray-200 flex items-center justify-between px-6">
        {/* LEFT - LOGO */}
        <div className="flex items-center gap-1">
          <img src="/logo.png" alt="Logo" className="h-8 cursor-pointer" />
          <span className="text-rose-500 font-bold text-xl cursor-pointer hidden md:block">
            airbnb
          </span>
        </div>

        {/* CENTER - SEARCH BAR */}
        <div className="hidden md:flex items-center border rounded-full shadow-sm px-4 py-2 hover:shadow-md transition">
          <span className="px-3 text-sm font-medium">Anywhere</span>
          <span className="h-5 w-[1px] bg-gray-300"></span>
          <span className="px-3 text-sm font-medium">Any week</span>
          <span className="h-5 w-[1px] bg-gray-300"></span>
          <span className="px-3 text-sm text-gray-500">Add guests</span>

          <button className="ml-2 bg-rose-500 text-white p-2 rounded-full">
            <IoSearch />
          </button>
        </div>

        {/* RIGHT - USER MENU */}
        <div className="flex items-center gap-4">
          <span 
            onClick={() => navigate("/listingpage1")}
            className="hidden md:block text-sm font-medium cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-full"
          >
            List your home
          </span>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 border rounded-full px-3 py-2 hover:shadow-md transition"
            >
              <GiHamburgerMenu />
              {userData ? (
                <div className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  {userData.username?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <CgProfile className="text-2xl text-gray-500" />
              )}
            </button>

            {isOpen && (
              <div className="absolute right-0 top-12 w-[200px] bg-white border rounded-xl shadow-xl py-2 z-50 text-sm">
                <div className="flex flex-col cursor-pointer">
                  {userData ? (
                    <>
                      <span onClick={handleLogout} className="px-4 py-3 hover:bg-gray-100 font-semibold">
                        Logout
                      </span>
                      <hr />
                      <span onClick={() => navigate("/listingpage1")} className="px-4 py-3 hover:bg-gray-100">List your home</span>
                      <span 
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer" 
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/mylisting");
                        }}
                      >
                        My listing
                      </span>
                      <span 
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer" 
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/mybooking");
                        }}
                      >
                        My booking
                      </span>
                    </>
                  ) : (
                    <>
                      <span onClick={() => navigate("/login")} className="px-4 py-3 hover:bg-gray-100 font-semibold">
                        Login
                      </span>
                      <span onClick={() => navigate("/signup")} className="px-4 py-3 hover:bg-gray-100">
                        Sign up
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CATEGORIES */}
      <div className="flex items-center justify-center gap-8 overflow-x-auto px-6 py-4 border-b border-gray-200 no-scrollbar">
        {categories.map((cat) => (
          <div
            key={cat.label}
            onClick={() => handleCategory(cat.label)}
            className={`flex flex-col items-center gap-2 cursor-pointer ${cate === cat.label || (cat.label === 'Trending' && cate === '') ? 'opacity-100 border-b-2 border-gray-500' : 'opacity-70 hover:opacity-100 hover:border-b-2 hover:border-gray-500'} transition min-w-fit pb-2`}
          >
            <span className="text-2xl text-gray-600">{cat.icon}</span>
            <span className="text-xs font-medium text-gray-600">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nav;
