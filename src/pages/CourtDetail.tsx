import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourtByID } from "../services/CourtsService";
import { Court } from "../type";

const CourtDetail = () => {
  const [court, setCourts] = useState<Court | null>(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getData = async () => {
      if (id)
        try {
          const data = await getCourtByID(id);
          setCourts(data);
        } catch (error) {
          console.log(error);
        }
    };
    getData();
  }, [id]);

  const generateAvailableTimes = (startTime: string, endTime: string) => {
    const times = [];
    let start = new Date(`1970-01-01T${startTime}:00`);
    let end = new Date(`1970-01-01T${endTime}:00`);

    while (start < end) {
      times.push(start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      start.setHours(start.getHours() + 1);
    }

    return times;
  };

  return (
    <section className="h-full py-10">
      <h2 className="text-2xl font-bold">Забронювати: {court?.name}</h2>
      <article className="flex gap-10 border border-slate-300 shadow-xl rounded-xl">
        <img className="w-96 h-96 object-cover" src={`${import.meta.env.VITE_BASE_URL + court?.picture}`} alt="court" />
        <div className="w-full">
          <h2 className="text-2xl text-center font-medium">{court?.name}</h2>
          <p>{court?.address}</p>
          <p>{court?.type.name}</p>
          <p>{court?.price}</p>
          {court?.workingHours && (
            <div className="mt-5 w-full bg-red-300 flex flex-col gap-5">
              <h3 className="text-x text-center font-semibold">Доступні години:</h3>
              <ul className="flex gap-2 justify-between">
                {generateAvailableTimes(court.workingHours.startTime, court.workingHours.endTime).map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default CourtDetail;
