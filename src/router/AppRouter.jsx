import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AthletesList from "../pages/AthletesList";
import Artistica from "../pages/Artistica";
import Parkour from "../pages/Parkour";
import AthleteDetail from "../pages/AthleteDetail";
import NotFound from "../pages/NotFound";
import AthleteEdit from "../pages/AthleteEdit";
import AthleteCreate from "../pages/AthleteCreate";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/athletes-trampolin" element={<AthletesList />} />
      <Route path="/athletes-trampolin/:id" element={<AthleteDetail />} />
      <Route path="/artistica" element={<Artistica />} />
      <Route path="/parkour" element={<Parkour />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/athletes/:id/edit" element={<AthleteEdit />} />
      <Route path="/athletes/new" element={<AthleteCreate />} />
    </Routes>
  );
};

export default AppRouter;