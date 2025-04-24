import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourtByID } from "../services/CourtsService";
import { Court } from "../type";

const getDaysOfWeek = () => {
  const daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четверг", "Пятниця", "Субота"];
  const today = new Date();
  const nextDays = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    nextDays.push({
      dayName: daysOfWeek[date.getDay()],
      date: date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
      }),
    });
  }
  return nextDays;
};

const BookingPage: React.FC = () => {
  const { id } = useParams();
  const [court, setCourt] = useState<Court | null>(null);
  const [weekDays, setWeekDays] = useState<{ dayName: string; date: string }[]>([]);

  useEffect(() => {
    setWeekDays(getDaysOfWeek());

    const getCourt = async () => {
      try {
        if (id) {
          const data = await getCourtByID(id);
          setCourt(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourt();
  }, []);

  const generateTimeSlots = (start: string, end: string): string[] => {
    const slots = [];

    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    while (startDate < endDate) {
      const hours = startDate.getHours().toString().padStart(2, "0");
      const minutes = startDate.getMinutes().toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);

      startDate.setHours(startDate.getHours() + 1);
    }

    return slots;
  };

  const timeSlots =
    court?.workingHours?.startTime && court?.workingHours?.endTime ? generateTimeSlots(court.workingHours.startTime, court.workingHours.endTime) : [];

  return (
    <>
      <section className="border mt-9 flex rounded-xl border-slate-200 shadow-2xl items-center p-10 justify-center flex-col">
        <h1 className="text-2xl mb-10 text-center font-bold">{court?.name}</h1>
        <article className="w-full flex justify-around gap-20">
          <img className="h-96 rounded-xl w-96 object-cover" src={`${import.meta.env.VITE_BASE_URL + court?.picture}`} alt={court?.name} />
          <div className="flex justify-between w-full gap-5 flex-col bg-gray-200 rounded-xl p-2">
            <ul className="flex flex-wrap justify-start gap-2.5 text-lg font-medium text-gray-700">
              {weekDays.map((day, index) => (
                <li
                  key={index}
                  className="bg-white relative rounded-2xl p-2 cursor-pointer border border-gray-300 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all"
                >
                  <span className="text-lg">{day.dayName}</span>
                  <small className="absolute top-0 text-xs right-2">{day.date}</small>
                </li>
              ))}
            </ul>
            <ul className="bg-white flex max-w-96 gap-5 flex-wrap rounded-xl p-2.5 ">
              {timeSlots.map((slot, idx) => (
                <li key={idx} className="text-center px-3 py-2 rounded bg-sky-500 text-white cursor-pointer transition-all">
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </>
  );
};

export default BookingPage;
