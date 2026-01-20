import React, { useContext } from 'react'
import { Navigate,Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ListingPage1 from './pages/ListingPage1.jsx'
import ListingPage2 from './pages/ListingPage2.jsx'
import ListingPage3 from './pages/ListingPage3.jsx'
import MyListing from './pages/MyListing.jsx'

import { userDataContext } from './Context/UserContext'



function App() {
   let {userData} = useContext(userDataContext);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/listingpage1' element={userData != null ?<ListingPage1 /> :<Navigate to ={"/"}/>}/>
        <Route path='/listingpage2' element={userData != null ?<ListingPage2 /> :<Navigate to ={"/"}/>}/>
         <Route path='/listingpage3' element={userData != null ?<ListingPage3 /> :<Navigate to ={"/"}/>}/> 
         <Route path='/mylisting' element={userData != null ?<MyListing /> :<Navigate to ={"/"}/>}/> 
      </Routes>
    </>
  )
}

export default App
