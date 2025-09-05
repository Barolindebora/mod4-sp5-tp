import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

import Trainer from "../pages/Trainer";
import Parkour from "../pages/ArtisticaMasc";
import AthleteDetail from "../pages/AthleteDetail";
import NotFound from "../pages/NotFound";
import AthleteEdit from "../pages/AthleteEdit";
import AthleteCreate from "../pages/AthleteCreate";
import MainLayout from "../components/MainLayout";
import AthletesTrampoline from "../pages/AthletesTrampoline";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyProfile from "../pages/MyProfile";
import TrainerCreate from "../pages/TrainerCreate";



const AppRouter = () => {
  return (
    <Routes>
      {/* Todas las rutas comparten el layout con Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/athletes-trampolin" element={<AthletesTrampoline />} />
        <Route path={`/athletes-trampolin/:id`} element={<AthleteDetail />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/parkour" element={<Parkour />} />
        <Route path="/athletes/:id/edit" element={<AthleteEdit />} />
        <Route path="/athletes/new" element={<AthleteCreate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mi-profile" element={<MyProfile />} />
        <Route path="/trainer/new" element={<TrainerCreate />} />
        
       
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Ruta para errores */}
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;