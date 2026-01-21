import axios from 'axios'
import React,{createContext,useContext,useState} from 'react'
import {authDataContext} from './AuthContext'
import { userDataContext } from './UserContext'
import { listingDataContext } from './ListingContext'

export const bookingDataContext = createContext()

export default function BookingContext({children}) {

    let[checkIn, setCheckIn] = useState("")
    let[checkOut, setCheckOut] = useState("")
    let[total, setTotal] = useState(0)
    let[nights, setNights] = useState(0)
    let{serverUrl} = useContext(authDataContext)
    let {refreshUser} = useContext(userDataContext)
    let {getListing} = useContext(listingDataContext)
    let [bookingData,setBookingData] = useState([])

    const handleBooking = async (id, bookingDetails) => {
        try{
            let result = await axios.post(`${serverUrl}/api/booking/create/${id}`, bookingDetails, {withCredentials:true})
            
            await refreshUser()
            // await getListing() // Optional: refresh listings if needed
            setBookingData(result.data)
            return result.data;
        }
        catch(error){
            console.log(error)
            setBookingData(null)
            throw error;
        }
    }

    let value ={
        checkIn,setCheckIn
        ,checkOut,setCheckOut
        ,total,setTotal
        ,nights,setNights
        ,bookingData,setBookingData
        ,handleBooking
    }
    
    return (
        <bookingDataContext.Provider value={value}>
            {children}
        </bookingDataContext.Provider>
    )
}