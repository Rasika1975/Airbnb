import React, { useEffect } from 'react'
import { createContext, useContext } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'


export const listingDataContext = createContext()


function ListingContext({children}) {
    const navigate = useNavigate();

    let[title,setTitle] = React.useState("")
    let[description,setDescription] = React.useState("")
    let[frontEndImage1,setFrontEndImage1] = React.useState(null)
    let[frontEndImage2,setFrontEndImage2] = React.useState(null)
    let[frontEndImage3,setFrontEndImage3] = React.useState(null)
    let[backEndImage1,setBackEndImage1] = React.useState(null)
    let[backEndImage2,setBackEndImage2] = React.useState(null)
    let[backEndImage3,setBackEndImage3] = React.useState(null)  
    let[rent,setRent] = React.useState("")
    let[city,setCity] = React.useState("")
    let[landMark,setLandMark] = React.useState("")
    let[category,setCategory] = React.useState("")
    let [adding, setAdding] = React.useState(false)
    let [listingData, setListingData] = React.useState([])
    let[newListData, setNewListData] = React.useState([])
    let{serverUrl}= useContext(authDataContext)
    let [cardDetails , setCardDetails] = React.useState(null)

    
    const handleAddListing = async () => {
        setAdding(true);
        try {
            // Validate required fields before sending
            if (!title || !description || !rent || !city || !landMark || !category) {
                console.error("Missing required fields");
                alert("Please fill in all required fields");
                setAdding(false);
                return;
            }
            
            // Validate that images are provided
            if (!backEndImage1 || !backEndImage2 || !backEndImage3) {
                console.error("All three images are required");
                alert("Please upload all three images");
                setAdding(false);
                return;
            }
            
            // Validate serverUrl is available
            if (!serverUrl) {
                console.error("Server URL is not available");
                alert("Server connection error. Please refresh the page.");
                setAdding(false);
                return;
            }
            
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image1", backEndImage1);
            formData.append("image2", backEndImage2);
            formData.append("image3", backEndImage3);
            formData.append("rent", rent);
            formData.append("city", city);
            formData.append("landmark", landMark); // Backend expects "landmark" (lowercase)
            formData.append("category", category);
            
            // Make the POST request - axios automatically sets multipart/form-data headers for FormData
            const result = await axios.post(`${serverUrl}/api/listing/add`, formData, {
                withCredentials: true
            });
            
            if (result.status === 201) {
                console.log("Listing created successfully", result.data);
                // Refresh the listing data after successful creation
                await getListing();
                navigate("/");
            }
            setAdding(false);
        } catch (error) {
            setAdding(false);
            console.error("Add listing error:", error);
            
            if (error.response?.status === 401) {
                alert("Please login again");
                navigate("/login");
                return;
            }
            
            alert(error.response?.data?.message || "Failed to add listing");
        }
    }
    const handleViewCard = async (id) => {
        try {
               let result = await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`, {
                withCredentials: true
            })
            console.log(result.data);
           setCardDetails(result.data);
            navigate("/viewcard");
        }
        catch (error) {
            console.error("View card error:", error);
        }
    }

    const getListing = async () => {
        try{
            let result = await axios.get(`${serverUrl}/api/listing/get`, {
                withCredentials: true
            });
            setListingData(result.data);
            setNewListData(result.data);
            } catch(error) {
                console.error("Get listing error:", error);
            }
        }
    useEffect(() => {
        getListing();
    }, []);

    let value= {
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
        handleAddListing,
        adding,setAdding,
        listingData,setListingData,
        newListData, setNewListData,
        cardDetails, setCardDetails,
        handleViewCard
    };
  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
}

export default ListingContext;