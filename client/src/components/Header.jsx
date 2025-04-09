import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className="flex mt-5 flex-col items-center  px-4 text-center">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl font-medium mb-4 ">
        Hey {userData ? userData.name : "Developer"} !{" "}
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
      </h1>
      <h2 className="text-3xl font-semibold mb-4">Welcome to Your app</h2>
      <br></br>

      <button className="border text-white w-40 border-gray-500 hover:bg-amber-600 bg-blue-400 rounded-2xl transition-all btn btn-success px-12">
        Get Start
      </button>
    </div>
  );
};

export default Header;
