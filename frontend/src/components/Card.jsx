import React, { useState, useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


function Card({title,landmark,image1,image2,image3,rent,id,city, isBooked, host }) {
  let navigate = useNavigate()
  let {userData} = useContext(userDataContext)
  let {handleViewCard} = useContext(listingDataContext)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3].filter(Boolean);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Card clicked, ID:', id, 'UserData:', userData);
    
    if(userData){
      try {
        await handleViewCard(id);
      } catch (error) {
        console.error('Error viewing card:', error);
      }
    } else {
      console.log('Redirecting to login');
      navigate('/login');
    }
  }
  
  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="group flex flex-col gap-2 w-full cursor-pointer" onClick={handleClick}>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
        {isBooked && (
          <div className="absolute top-3 left-3 z-10 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
            Booked
          </div>
        )}
        {/* Main Image */}
        <img 
          src={images.length > 0 ? images[currentImageIndex] : ""} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Available';
          }}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 opacity-0 shadow-md transition-all hover:bg-white hover:scale-110 group-hover:opacity-100 focus:opacity-100 active:scale-95 z-10"
            >
              <FaChevronLeft size={14} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 opacity-0 shadow-md transition-all hover:bg-white hover:scale-110 group-hover:opacity-100 focus:opacity-100 active:scale-95 z-10"
            >
              <FaChevronRight size={14} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
              {images.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 rounded-full transition-all shadow-sm ${currentImageIndex === index ? 'w-1.5 bg-white scale-110' : 'w-1.5 bg-white/60 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate text-base">
            {city}, {landmark}
          </h3>
        </div>
        <p className="text-gray-500 text-sm truncate">
          {title}
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-semibold text-gray-900">₹{rent}</span>
          <span className="text-gray-900 text-sm"> night</span>
        </div>
      </div>
    </div>
  )
}

export default Card
