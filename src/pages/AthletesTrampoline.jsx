import { useEffect, useState } from "react"; 
import { getAthletes } from "../services/athletesService";
import AthleteCard from "../components/AthleteCard";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const AthletesTrampoline = () => {
  const { t } = useLanguage();
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAthletes();

        if (!data || data.length === 0) {
          // si no hay atletas, redirige a NotFound
          navigate("*", { replace: true });
        } else {
          setAthletes(data);
        }

      } catch (error) {
        console.error("Error fetching athletes:", error);
        // si hay error en la API, también va al NotFound
        navigate("*", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-blue-700 font-semibold text-lg">{t.loader}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
        {t.trampolineGymnastics}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>
    </div>
  );
};

export default AthletesTrampoline;
