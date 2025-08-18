import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex flex-col items-center gap-4">
    

      {/* Corazones con líneas */}
      <div className="flex items-center justify-center gap-3">
        <span className="h-0.5 w-12 bg-red-600"></span>
        <FaHeart className="text-blue-600 text-xl" />
        <FaHeart className="text-red-600 text-xl" />
        <FaHeart className="text-blue-600 text-xl" />
        <span className="h-0.5 w-12 bg-red-600"></span>
      </div>
    </div>
  );
};

export default Footer;

