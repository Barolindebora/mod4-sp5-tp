import { useEffect, useState } from "react";
import { getAthletes } from "../services/athletesService";
import AthleteCard from "../components/AthleteCard";

const AthletesList = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAthletes();
        setAthletes(data);
      } catch (error) {
        console.error("Error fetching athletes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-blue-700 font-semibold text-lg">Loading athletes...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
        Athletes List
      </h1>

      {athletes.length === 0 ? (
        <p className="text-center text-blue-700 font-medium">
          No athletes found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AthletesList;