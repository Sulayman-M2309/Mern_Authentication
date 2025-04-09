// import React, { useContext, useEffect ,useState} from 'react'
// import { useNavigate } from "react-router";
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AppContent } from '../context/AppContext';


// const ResetPassword = () => {
//   const{backendUrl}=useContext(AppContent)
//   axios.defaults.withCredentials=true
//   const navigate=useNavigate()
//   const [email,setEmail]=useState('')
//   const [newPassword,setNewPassword]=useState('')
//   const [isEmailSent,setIsEmailSent]=useState('')
//   const [otp, setOtp]=useState(0)
//   const [isOtpSubmited, setIsOtpSubmited]=useState(false)
//    const inputRefs=React.useRef([])
//     const handleInput=(e,index)=>{
//       if(e.target.value.length>0 && index<inputRefs.current.length-1 ){
//         inputRefs.current[index + 1].focus(); 
//       }
//     }
//     const handleKeyDown = (e, index) => {
//       if (e.key === "Backspace" && e.target.value === "" && index > 0) {
//         inputRefs.current[index - 1].focus(); // Focus previous input
//       }
//     };
    
//     const handlePaste = (e, i) => {
//       const paste = e.clipboardData.getData("text");
//       const pasteArray = paste.split('');
//       pasteArray.forEach((char, i) => {
//         if (inputRefs.current[i]) {
//           inputRefs.current[i].value = char; 
//         }
//       });
//     };
//     const onSubmitHandler=async(e)=>{
//       try {
//         e.preventDefault();
//         const otpArray= inputRefs.current.map(e=>e.value)
//         const otp=otpArray.join('')
//         const { data } = await axios.post(backendUrl + "/api/auth/verify-account",{otp})
//         if (data.success) {
//           toast.success(data.message)
//           getUserData();
//           navigate('/')
//         } else {
//           toast.error(data.message)
//         }
//       } catch (error) {
//         toast.error(error.message)
//       }
//     }
//     const onSubmitEmail=async(e)=>{
//       e.preventDefault()
//       try {
//         const { data } = await axios.post(backendUrl + "/api/auth/reset-otp",{email })
//         data.success ?toast.success(data.message):toast.error(data.message)
//          data.success && setIsEmailSent(true)
//       } catch (error) {
//         toast.error(error.message)
//       }

//     }
//     const onSubmitotp=async(e)=>{
//       e.preventDefault();
//       const otpArray=inputRefs.current.map(e=>e.value)
//       setOtp(otpArray.json(''))
//       setIsOtpSubmited(true)
//     }
//     const onSubmitNewpassword=async(e)=>{
//       e.preventDefault();
//     try {
//       const { data } = await axios.post(backendUrl + "/api/auth/reset-password",{email,otp,newPassword})
//       data.success ?toast.success(data.message):toast.error(data.message)
//       data.success && navigate('/login')
//     } catch (error) {
//       toast.error(error.message)
//     }
//     }
//   return (
//     <div className="flex items-center justify-center px-5 min-h-screen sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
//        <img onClick={() => navigate("/")}
//                   src={assets.logo}
//                   alt=""
//                   className=" absolute left-5 top-5 w-28 cursor-pointer sm:left-20 sm:w-32 mb-5"
//                 />
//              {
//              !isEmailSent &&  <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"> 
//               <h1 className='text-white text-2xl p-5 font-semibold text-center mb-4'>Reset Password</h1>
//               <p className='text-indigo-400 font-semibold text-center mb-4'>Reseting Your Email Address</p>
//               <br></br>
//               <div  className="flex items-center h-8 mb-4 gap-3 w-full rounded-full bg-[#333A5C]">
//               <input className='w-full h-8 rounded-full p-5 text-lg '
//                  type="email" placeholder='Enter Your Email' value={email} onChange={e=>setEmail(e.target.value)} required />
//               </div>
//               <br />
//               <button className="border text-white w-full border-gray-500 hover:bg-amber-600 bg-blue-400 rounded-2xl transition-all btn btn-success px-12 text-xl">Submit</button>
//               </form>
//              }
// {!isOtpSubmited && isEmailSent &&
//                 <form onSubmit={onSubmitotp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"> 
//                 <h1 className='text-white text-2xl p-5 font-semibold text-center mb-4'>Reset Password</h1>
//                 <p className='text-indigo-400 font-semibold text-center mb-4'>Reseting Your Email Address</p>
//                 <br></br>
//                 <div  className="flex items-center h-8 mb-4 gap-3 w-full rounded-full bg-[#333A5C]">
//                 <input className='w-full h-8 rounded-full p-5 text-lg '
//                    type="email" placeholder='Enter Your Email' value={email} onChange={e=>setEmail(e.target.value)} required />
//                 </div>
//                 <br />
//                 <button className="border text-white w-full border-gray-500 hover:bg-amber-600 bg-blue-400 rounded-2xl transition-all btn btn-success px-12 text-xl">Submit</button>
//                 </form>}

//                 <form  className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
//             <h1 className='text-white text-2xl p-5 font-semibold text-center mb-4'>Reset Your Otp</h1>
//             <p className='text-indigo-400 font-semibold text-center mb-4'>Enter The 6 Digit Your Otp Code</p>
//             <br />

//             <div className='flex justify-between mb-8' onPaste={handlePaste}>{
//               Array(6).fill(0).map((_,index)=>(
//                 <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333a5C]  text-white text-center text-xl rounded-md'
//                 ref={e=>inputRefs.current[index]=e}
//                 onInput={(e)=>handleInput(e,index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
            
//                 />
//               ))
//               }
//             </div>
//             <br />
//             <button className='border text-xl text-white w-full border-gray-500 hover:bg-amber-600 bg-blue-400 rounded-2xl transition-all btn mb-8 btn-success px-12'>Submit</button>
//           </form>

//           {/* enter a new Password */}
//           {
//            isOtpSubmited && isEmailSent &&
          
//           <form onSubmit={onSubmitNewpassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"> 
//                 <h1 className='text-white text-2xl p-5 font-semibold text-center mb-4'>New Password</h1>
//                 <p className='text-indigo-400 font-semibold text-center mb-4'>Enter The New password below</p>
//                 <br></br>
//                 <div  className="flex items-center h-8 mb-4 gap-3 w-full rounded-full bg-[#333A5C]">
//                 <input className='w-full h-8 rounded-full p-5 text-lg '
//                    type="password" placeholder='Enter Your newPassword' value={newPassword} onChange={e=>setNewPassword(e.target.value)} required />
//                 </div>
//                 <br />
//                 <button className="border text-white w-full border-gray-500 hover:bg-amber-600 bg-blue-400 rounded-2xl transition-all btn btn-success px-12 text-xl">Submit</button>
//                 </form>}
//     </div>
//   )
// }
// export default ResetPassword
import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [step, setStep] = useState('email'); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    paste.split('').forEach((char, i) => {
      if (inputRefs.current[i]) inputRefs.current[i].value = char;
    });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-otp`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setStep('otp');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const otpCode = inputRefs.current.map(el => el?.value || '').join('');
    if (otpCode.length < 6) return toast.error("Please enter the full 6-digit OTP");

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp: otpCode });
      if (data.success) {
        toast.success(data.message);
        setOtp(otpCode); 
        setStep('newPassword');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-5 min-h-screen sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 top-5 w-28 cursor-pointer sm:left-20 sm:w-32 mb-5"
      />

      {step === 'email' && (
        <form onSubmit={handleSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl p-5 font-semibold text-center mb-4">Reset Password</h1>
          <p className="text-indigo-400 font-semibold text-center mb-4">Enter your email to receive an OTP</p>
          <br />
  
          <div className="flex items-center h-8 mb-4 gap-3 w-full rounded-full bg-[#333A5C]">
            <input
              type="email"
              required
              placeholder="Enter Your Email"
              className="w-full h-8 rounded-full p-5 text-lg bg-transparent text-white outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <button className="w-full  text-white bg-blue-400 hover:bg-amber-600 rounded-2xl text-xl py-2">Send OTP</button>
         
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleSubmitOtp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl p-5 font-semibold text-center mb-4">Enter OTP</h1>
          <p className="text-indigo-400 font-semibold text-center mb-4">Enter the 6-digit OTP sent to your email</p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  maxLength="1"
                  required
                  className="w-12 h-12 bg-[#333a5C] text-white text-center text-xl rounded-md"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <br />
          <button className="w-full text-white bg-blue-400 hover:bg-amber-600 rounded-2xl text-xl py-2">Verify OTP</button>
        </form>
      )}

      {step === 'newPassword' && (
        <form onSubmit={handleSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl p-5 font-semibold text-center mb-4">New Password</h1>
          <p className="text-indigo-400 font-semibold text-center mb-4">Enter your new password</p>
          <div className="flex items-center h-8 mb-4 gap-3 w-full rounded-full bg-[#333A5C]">
            <input
              type="password"
              required
              placeholder="Enter new password"
              className="w-full h-8 rounded-full p-5 text-lg bg-transparent text-white outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <br />
          <button className="w-full text-white bg-blue-400 hover:bg-amber-600 rounded-2xl text-xl py-2">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
