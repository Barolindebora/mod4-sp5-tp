import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <Outlet /> {/* acá se renderizan las páginas */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;