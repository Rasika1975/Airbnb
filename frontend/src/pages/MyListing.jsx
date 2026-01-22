import React, { useContext } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import { userDataContext } from "../Context/UserContext";

function MyListing() {
  let { userData, loading } = useContext(userDataContext);
  const myListings = userData?.listing || [];

  return (
    <div>
      <Nav />
      <div className="w-full min-h-screen pb-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Listings</h1>
          <p className="text-gray-600 mb-8">
            These are the properties you have added.
          </p>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {myListings.length > 0 ? (
                myListings.map((list) => (
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
                    hostId={list.host}
                    isBooked={list.isBooked}
                    host={list.host}
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center py-8">
                  You have not added any listings yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyListing;
