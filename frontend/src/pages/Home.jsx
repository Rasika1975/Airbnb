import React, { useContext } from 'react'
import Nav from '../components/Nav'
import Card from '../components/Card'
import { listingDataContext } from '../Context/ListingContext'

function Home() {
  let { listingData, setListingData , newListData } = useContext(listingDataContext)
  return (
    <div >
      <Nav />
      <div className ='w-full min-h-screen pb-10'>
       <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
         <h1 className="text-3xl font-bold text-gray-800 mb-8">Discover Places Around the World</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
           {listingData && listingData.length > 0 ? (
             newListData.map((list) => (
               <Card 
                 key={list._id}
                 title={list.title} 
                 landmark={list.landmark} 
                 city={list.city} 
                 image1={list.image1} 
                 image2={list.image2} 
                 image3={list.image3} 
                 rent={list.rent} 
                 id={list._id}
               />
             ))
           ) : (
             <p className="text-gray-500 col-span-full text-center py-8">No listings available yet</p>
           )}
         </div>
       </div>
      
      </div>
      
    </div>
  )
}

export default Home
