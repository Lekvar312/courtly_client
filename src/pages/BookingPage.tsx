import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import { getCourtByID } from "../services/CourtsService";
import { Court } from "../type";
import { createPortal } from "react-dom";
import ModalView from "../components/ModalView";

type BookingDataType = {
  date: string;
  time: string[];
  userId: string;
  courtId: string | undefined;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

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
        year: "2-digit",
      }),
    });
  }
  return nextDays;
};

const BookingPage: React.FC = () => {
  const { id } = useParams();
  const [court, setCourt] = useState<Court | null>(null);
  const [weekDays, setWeekDays] = useState<{ dayName: string; date: string }[]>([]);
  const [bookingData, setBookingData] = useState<BookingDataType>({
    userId: "",
    date: "",
    time: [],
    courtId: "",
  });
  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo && userInfo._id && court?._id) setBookingData((prev) => ({ ...prev, userId: userInfo._id, courtId: court?._id }));
    setUser(userInfo);
  }, [court]);

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

  const toggleTimeSlot = (slot: string) => {
    setBookingData((prev) => {
      const exists = prev.time.includes(slot);

      if (exists) {
        // Якщо слот уже вибраний, видаляємо його
        return {
          ...prev,
          time: prev.time.filter((s) => s !== slot),
        };
      } else {
        // Додаємо обраний слот
        return {
          ...prev,
          time: [...prev.time, slot].sort(), // сортуємо, щоб час був у правильному порядку
        };
      }
    });
  };

  const getEndTime = (startTime: string) => {
    const [hour, minute] = startTime.split(":").map(Number); // розбиваємо час на години та хвилини
    const endDate = new Date();
    endDate.setHours(hour + 1, minute); // додаємо 1 годину до вибраного часу
    return endDate.toTimeString().slice(0, 5); // повертаємо час у форматі HH:MM
  };
  const isTimeSlotDisabled = (slot: string): boolean => {
    const [slotHour, slotMinute] = slot.split(":").map(Number);
    const slotDate = new Date();
    slotDate.setHours(slotHour, slotMinute, 0, 0);

    return slotDate < new Date(); // Якщо час слоту менший за поточний, то він має бути disabled
  };
  return (
    <>
      <section className="border mt-9 flex rounded-xl border-slate-200 shadow-2xl items-center p-3 md:p-10 justify-center flex-col">
        <h1 className="text-2xl mb-4 md:mb-10 text-center font-bold">{court?.name}</h1>
        <article className="w-full flex flex-col md:flex-row justify-around gap-10">
          <img className="h-96 rounded-xl w-full md:w-96 object-cover" src={`${import.meta.env.VITE_BASE_URL + court?.picture}`} alt={court?.name} />
          <div className="flex justify-between w-full gap-5 bg-stone-100 rounded-xl p-2">
            <ul className="flex w-full flex-wrap flex-col justify-start gap-2.5 text-lg font-medium text-gray-700">
              <h1 className="text-center text-xs p-2 sm:text-lg font-medium">Оберіть день бронювання</h1>
              {weekDays.map((day, index) => (
                <li
                  onClick={() => setBookingData((prev) => ({ ...prev, date: day.date, time: [] }))}
                  key={index}
                  className={`relative rounded px-2 py-1 cursor-pointer border ${
                    bookingData?.date === day.date ? "bg-sky-500 text-white" : "bg-white"
                  } text-whit
                  border-gray-300 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all`}
                >
                  <span className="text-lg">{day.dayName}</span>
                  <small className="absolute top-0 text-xs right-2">{day.date}</small>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-between border p-1 rounded border-gray-300 bg-white w-full sm:w-80">
              <h1 className="text-center text-xs p-2 sm:text-lg font-medium">Оберіть доступний час для бронювання</h1>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center p-1 gap-1">
                {timeSlots.map((slot, index) => (
                  <li onClick={() => toggleTimeSlot(slot)} key={index} className={` w-full sm:w-16  flex items-center justify-center `}>
                    <button
                      disabled={isTimeSlotDisabled(slot)}
                      className={`${
                        bookingData.time.includes(slot) ? "bg-stone-200 text-stone-500 border-stone-400" : "bg-sky-500 text-white"
                      } px-3 py-2 rounded cursor-pointer disabled:opacity-50 w-full sm:w-16`}
                    >
                      {slot}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                disabled={!bookingData?.date || bookingData?.time.length === 0}
                className="bg-green-400 text-white rounded py-2 cursor-pointer font-bold disabled:border disabled:cursor-auto disabled:bg-transparent disabled:text-black disabled:font-normal"
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                Забронювати
              </button>
              {isModalOpen &&
                createPortal(
                  <ModalView onClose={() => setIsModalOpen(false)}>
                    <h2>{user?.name}</h2>
                    <h4>
                      Ви забронювали <b>{court?.name} </b>
                    </h4>
                    <p>
                      Ваш час бронювання: {bookingData.time[0]} до {getEndTime(bookingData.time[bookingData.time.length - 1])}
                    </p>
                  </ModalView>,
                  document.body
                )}
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default BookingPage;
