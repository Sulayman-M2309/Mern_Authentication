import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { toast } from 'react-toastify';
import axios from "axios";
const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin }= useContext(AppContent);
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  
  const logout=async()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data}=await axios.post(backendUrl+'/api/auth/logout') 
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  const navigate = useNavigate();
  return (
    <div className="w-full mt-5 flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />
      {userData ? (
        <div className="w-24 h-6 pl-0.5  justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name.toUpperCase()}
          <div className=" absolute w-full hidden group-hover:block top-5 right-16 z-10  text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-200 text-sm">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-300 cursor-pointer">
                  Verify Email
                </li>
              )}

              <li  onClick={logout} className="py-1 px-2 hover:bg-gray-300 cursor-pointer pr-10">Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="border text-white w-40 border-gray-500 hover:bg-amber-600 bg-blue-400 rounded-2xl transition-all btn btn-success px-12"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
