import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      {/* Botón */}
      <button
        onClick={() => navigate("/athletes/new")}
        className="mt-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 
                   text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
      >
        ➕ Add Athlete
      </button>

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

