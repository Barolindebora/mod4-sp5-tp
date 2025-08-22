// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import {useLanguage} from "../context/LanguageContext"

const NotFound = () => {
  const {t} = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white text-center px-6">
      {/* Número 404 con estilo llamativo */}
      <h1 className="text-9xl font-extrabold tracking-widest animate-bounce">
        404
      </h1>

      {/* Mensaje */}
      <p className="text-2xl mt-4 font-semibold">
        {t.notFound}
      </p>
      <p className="text-lg mt-2 max-w-md">
        {t.notFoundMsj}
      </p>

      {/* Botón para volver a Home */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105"
      >
        {t.goHome}
      </Link>
    </div>
  );
};

export default NotFound;