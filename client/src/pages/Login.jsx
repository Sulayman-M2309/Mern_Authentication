import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        console.log("Login success:", data);
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        console.log("Login API URL:", backendUrl + "/api/auth/login");

        if (data.success) {
          setIsLoggedin(true);
          getUserData()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Login failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="flex mx-auto gap-5 items-center justify-center px-5 min-h-screen sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className=" absolute left-5 top-5 w-28 cursor-pointer sm:left-20 sm:w-32"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-center font-semibold text-white text-3xl mb-4">
          {state === "Sign Up" ? "create  Account" : "Login"}
        </h2>
        <p className="text-center mb-6 text-sm">
          {state === "Sign Up" ? "create Your Account" : "Login Your Account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center h-8 mb-4 gap-3 w-full rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none "
                placeholder="Enter Your Name"
                required
                type="text"
              />
            </div>
            
       
          )}
             <br></br>

          <div className="flex  h-8  items-center mb-4 gap-3 w-full px-5 py-7 rounded-full bg-[#333A5C]">
            <img className="" src={assets.mail_icon} alt="" />
            <input
            
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              placeholder="Enter Your Email"
              required
              type="email"
            />
          </div>
          <br></br>
          <div className="flex h-8  items-center mt-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              placeholder="Enter Your password"
              required
              type="password"
            />
          </div>
          <br />
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgate Password?
          </p>
          <button className="w-full py-3 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-500 text-center text-sm mt-6">
            Alreday have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-500 text-center text-sm mt-6 mb-5">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 cursor-pointer underline"
            >
              SignUp{" "}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
