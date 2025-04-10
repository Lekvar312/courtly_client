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
    <section className="min-h-screen py-10 flex flex-col gap-10 justify-center">
      <h2 className="text-2xl font-bold">Забронювати: {court?.name}</h2>
      <article className="shadow-2xl w-full flex flex-col gap-2 md:flex-row px-2 md:px-0">
        <img
          src={`${import.meta.env.VITE_BASE_URL + court?.picture}`}
          alt={court?.name}
          className="w-full md:w-1/2 h-full  object-cover max-h-[450px]"
        />

        <div className="w-full text-lg font-light flex flex-col justify-between gap-5 ">
          <h3 className="text-xl font-bold text-center">{court?.name}</h3>
          <div className="flex flex-col gap-3 w-full">
            <h3>
              <b className="font-bold">Адреса: </b>
              {court?.address}
            </h3>
            <p>
              <b className="font-bold">Тип майданчика: </b>
              {court?.type.name}
            </p>
            <p>
              <b className="font-bold">Ціна/год: </b>
              {court?.price}
            </p>
          </div>
          {court?.workingHours && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-center">Доступні години</h3>
              <ul className="flex gap-3 justify-start flex-wrap">
                {generateAvailableTimes(court.workingHours.startTime, court.workingHours.endTime).map((time, index) => (
                  <li className="bg-sky-500 p-2 hover:bg-fuchsia-300 text-white font-bold rounded cursor-pointer" key={index}>
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className="bg-green-500 w-full py-2 text-white font-bold cursor-pointer hover:bg-green-600">Забронювати</button>
        </div>
      </article>
    </section>
  );
};

export default CourtDetail;
