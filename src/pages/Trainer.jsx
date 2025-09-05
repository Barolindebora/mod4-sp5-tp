import { useEffect, useState } from "react";
import axios from "axios";
import TrainerCard from "../components/TrainerCard";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const API_URL = "https://mod4-backend-final.onrender.com/api/trainers";

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get(API_URL);
        setTrainers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer._id} trainer={trainer} />
      ))}
    </div>
  );
};

export default Trainer;