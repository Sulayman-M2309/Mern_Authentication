import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router";
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const EmailVerify = () => {
  axios.defaults.withCredentials=true;
  const {backendUrl,isLoggedin,userData,getUserData}=useContext(AppContent)
  const navigate=useNavigate()
  const inputRefs=React.useRef([])
  const handleInput=(e,index)=>{
    if(e.target.value.length>0 && index<inputRefs.current.length-1 ){
      inputRefs.current[index + 1].focus(); 
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus(); // Focus previous input
    }
  };
  
  const handlePaste = (e, i) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split('');
    pasteArray.forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = char; 
      }
    });
  };
  const onSubmitHandler=async(e)=>{
    try {
      e.preventDefault();
      const otpArray= inputRefs.current.map(e=>e.value)
      const otp=otpArray.join('')
      const { data } = await axios.post(backendUrl + "/api/auth/verify-account",{otp})
      if (data.success) {
        toast.success(data.message)
        getUserData();
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
//   useEffect(()=>{
// isLoggedin&&userData && userData.isAccountVerified && navigate('/')
//   },[isLoggedin,userData])
useEffect(() => {
  if (isLoggedin && userData?.isAccountVerified) {
    navigate('/');
  }
}, [isLoggedin, userData, navigate]);

  return (
<>    <div className="flex items-center justify-center px-5 min-h-screen sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400"> <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt=""
            className=" absolute left-5 top-5 w-28 cursor-pointer sm:left-20 sm:w-32"
          />
          <form onSubmit={onSubmitHandler}  className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
            <h1 className='text-white text-2xl p-5 font-semibold text-center mb-4'>Email Verify Otp</h1>
            <p className='text-indigo-400 font-semibold text-center mb-4'>Enter The 6 Digit Your Otp Code</p>
            <br />

            <div className='flex justify-between mb-8' onPaste={handlePaste}>{
              Array(6).fill(0).map((_,index)=>(
                <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333a5C]  text-white text-center text-xl rounded-md'
                ref={e=>inputRefs.current[index]=e}
                onInput={(e)=>handleInput(e,index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
            
                />
              ))
              }
            </div>
            <br />
            <button className='border text-xl text-white w-full border-gray-500 hover:bg-amber-600 bg-blue-400 rounded-2xl transition-all btn mb-8 btn-success px-12'>Verify</button>
          </form>
          </div>
     
</>
  )
}

export default EmailVerify