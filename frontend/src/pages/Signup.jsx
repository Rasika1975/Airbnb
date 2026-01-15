import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  let {serverUrl} = useContext(authDataContext);
  let { userData, setUserData } = useContext(userDataContext);
  let [name , setName] = useState("");
  let [email , setEmail] = useState("");
  let [password , setPassword] = useState("");

  const handleSignUP = async (e) => {
    try {
      e.preventDefault();
      let result = await axios.post(`${serverUrl}/api/auth/signup`, {
        name,
        email,
        password
      }, {withCredentials: true})
      const returned = result.data.user || result.data;
      setUserData({
        username: returned.name || returned.username || (returned.email ? returned.email.split('@')[0] : ''),
        email: returned.email,
        id: returned.id || returned._id
      });
      navigate("/");
      console.log("Signup successful:", result.data);
  }
  catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f7f7f7]">

      {/* 🔴 Back Arrow (Outside Card) */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 w-11 h-11 bg-[#FF385C] text-white 
                   flex items-center justify-center rounded-full 
                   cursor-pointer shadow-lg hover:bg-red-500 transition"
      >
        <FaArrowLeft size={18} />
      </div>

      {/* Signup Card */}
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Welcome to Airbnb
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSignUP}>
          
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-red-400 focus:outline-none"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#FF385C] hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Login */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#FF385C] font-semibold cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;