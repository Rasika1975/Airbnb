import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'


function Card({title,landmark,image1,image2,image3,rent,id,city}) {
  let navigate = useNavigate()
  let {userData} = useContext(userDataContext)
  let {handleViewCard} = useContext(listingDataContext)
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
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300" onClick={handleClick}>
      <div className="relative">
        {/* Main Image */}
        <div className="h-48 overflow-hidden">
          <img 
            src={image1} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Available';
            }}
          />
        </div>
        
        {/* Small Image Gallery */}
        <div className="flex h-24 mt-1">
          <div className="w-1/2 h-full overflow-hidden">
            <img 
              src={image2} 
              alt={`${title}-2`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/175x100?text=Image';
              }}
            />
          </div>
          <div className="w-1/2 h-full overflow-hidden pl-1">
            <img 
              src={image3} 
              alt={`${title}-3`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/175x100?text=Image';
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-gray-500 text-sm mb-1">
          {`in ${landmark}, ${city}`}
        </div>
        <h3 className="font-semibold text-gray-800 mb-1 truncate">
          {title}
        </h3>
        <div className="text-lg font-bold text-[#FF385C]">
          ₹{rent}<span className="text-gray-500 font-normal text-sm"> / day</span>
        </div>
      </div>
    </div>
  )
}

export default Card
