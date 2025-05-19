import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourtByID } from "../services/CourtsService";
import { Court } from "../type";
import { createPortal } from "react-dom";
import ModalView from "../components/ModalView";
import { Link } from "react-router-dom";
import { createBooking, getAllBookings } from "../services/BookingService";
import { ToastContainer } from "react-toastify";
import { showToast } from "../components/ToastNotification";
import { Check } from "lucide-react";
type BookingDataType = {
  date: string;
  time: string[];
  userId: string;
  courtId: string | undefined;
};

type fetchBookingsType = {
  courtId: {
    name: string;
    address: string;
    _id: string;
  };
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
  const [bookings, setBookings] = useState([]);
  const [repeatBooking, setRepeatBooking] = useState<boolean>(false);

  useEffect(() => {
    setWeekDays(getDaysOfWeek());
    const getCourt = async () => {
      try {
        if (id) {
          const data = await getCourtByID(id);
          setCourt(data);
          const allBookings = await getAllBookings();
          const courtBooking = allBookings.filter((b: any) => b.courtId?._id === id);
          setBookings(courtBooking);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourt();
  }, []);

  console.log(bookings);

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
        return {
          ...prev,
          time: prev.time.filter((s) => s !== slot),
        };
      } else {
        return {
          ...prev,
          time: [...prev.time, slot].sort(),
        };
      }
    });
  };

  const getEndTime = (startTime: string) => {
    const [hour, minute] = startTime.split(":").map(Number);
    const endDate = new Date();
    endDate.setHours(hour + 1, minute);
    return endDate.toTimeString().slice(0, 5);
  };
  const isTimeSlotDisabled = (slot: string): boolean => {
    if (!bookingData.date) return true;

    const [day, month, year] = bookingData.date.split(".");
    const [slotHour, slotMinute] = slot.split(":").map(Number);

    const slotDate = new Date(`20${year}`, Number(month) - 1, Number(day), slotHour, slotMinute);

    return slotDate < new Date();
  };
  const isTimeSlotBooked = (slot: string): boolean => {
    if (!bookingData.date || !bookings) return false;

    const [day, month, year] = bookingData.date.split(".");
    const [slotHour, slotMinute] = slot.split(":").map(Number);

    const targetDate = new Date(`20${year}`, Number(month) - 1, Number(day), slotHour, slotMinute);

    return bookings.some((b) =>
      b.timeSlots.some((ts: string) => {
        const bookedSlot = new Date(ts);
        return (
          bookedSlot.getFullYear() === targetDate.getFullYear() &&
          bookedSlot.getMonth() === targetDate.getMonth() &&
          bookedSlot.getDate() === targetDate.getDate() &&
          bookedSlot.getHours() === targetDate.getHours()
        );
      })
    );
  };

  const createMonthlyBookings = async () => {
    const [day, month, year] = bookingData.date.split(".");
    const baseDate = new Date(`20${year}`, Number(month) - 1, Number(day));

    for (let i = 0; i < 4; i++) {
      const bookingDate = new Date(baseDate);
      bookingDate.setDate(baseDate.getDate() + i * 7);

      const formattedDate = bookingDate.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      await createBooking({
        userId: bookingData.userId,
        courtId: bookingData.courtId,
        date: formattedDate,
        time: bookingData.time,
      });
    }
  };

  return (
    <>
      <section className="border mt-9 flex rounded-xl border-slate-200 shadow-2xl items-center p-3 md:p-10 justify-center flex-col">
        <h1 className="text-2xl mb-4 md:mb-10 text-center font-bold">{court?.name}</h1>
        <article className="w-full flex flex-col md:flex-row justify-around gap-10">
          <img className="h-96 rounded-xl w-full md:w-96 object-cover" src={`${import.meta.env.VITE_BASE_URL + court?.picture}`} alt={court?.name} />
          <div className="flex justify-between w-full gap-5 bg-stone-100 rounded-xl p-2">
            <ul className="flex w-full flex-wrap flex-col justify-start gap-2.5 text-lg font-medium text-gray-700">
              <h1 className="text-start text-xs p-2 sm:text-xl font-medium">Оберіть день бронювання</h1>
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
                      disabled={isTimeSlotDisabled(slot) || isTimeSlotBooked(slot)}
                      className={`${
                        bookingData.time.includes(slot) ? "opacity-40 bg-sky-500 text-white" : "bg-sky-500 text-white"
                      } px-3 py-2 rounded cursor-pointer disabled:bg-stone-200 disabled:text-stone-500 disabled:border-stone-400 w-full sm:w-16 disabled:cursor-not-allowed`}
                    >
                      {slot}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                disabled={!bookingData?.date || bookingData?.time.length === 0}
                className="bg-green-400 text-white border border-transparent rounded py-2 cursor-pointer hover:bg-green-500 font-bold disabled:cursor-not-allowed disabled:border disabled:border-gray-300 disabled:bg-gray-200  disabled:text-black disabled:font-normal"
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                Забронювати
              </button>
              {isModalOpen &&
                createPortal(
                  <ModalView onClose={() => setIsModalOpen(false)}>
                    {user && user._id ? (
                      <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-xl">Вітаємо {user?.name}</h2>
                        <h4>
                          Ви забронювали <b>{court?.name} </b>
                        </h4>
                        <p>
                          Ваш час бронювання: {bookingData.time[0]} до {getEndTime(bookingData.time[bookingData.time.length - 1])}
                        </p>
                        <b>Ціна становить: {Number(court?.price) * bookingData.time.length} грн</b>
                        <span className="flex gap-2 items-center">
                          <input
                            onChange={() => setRepeatBooking((prev) => !prev)}
                            checked={repeatBooking}
                            type="checkbox"
                            id="monthBooking"
                            className="sr-only"
                          />
                          <span
                            onClick={() => setRepeatBooking((prev) => !prev)}
                            className={`w-5 h-5 cursor-pointer flex rounded items-center justify-center border  ${
                              repeatBooking ? "border-green-500 bg-green-500" : "border-black"
                            }`}
                          >
                            {repeatBooking && <Check className="text-white font-bold" strokeWidth={4} />}
                          </span>
                          <label className="cursor-pointer" htmlFor="monthBooking">
                            Повторяти протягом місяця
                          </label>
                        </span>
                        <span className="flex justify-between">
                          <button
                            onClick={async () => {
                              if (repeatBooking) {
                                await createMonthlyBookings();
                              } else {
                                await createBooking(bookingData);
                              }
                              setIsModalOpen(false);
                              showToast("Успішно заброньовано", "success");
                            }}
                            className="bg-sky-500 w-full py-2 px-1 rounded text-white font-bold cursor-pointer hover:bg-sky-600"
                          >
                            Підтвердити
                          </button>
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <h3 className="text-center text-yellow-500 font-bold text-lg">Ви не увійшли в обліковий запис</h3>
                        <p>
                          Для того що забронювати майданчик ви повинні{" "}
                          <span className="text-blue-500 font-bold hover:underline">
                            <Link to={"/login"}>увійти</Link>
                          </span>{" "}
                          в обліковий запис, якщо в вас його не існує то{" "}
                          <span className="text-blue-500 font-bold hover:underline">
                            <Link to={"/signup"}>зареєструватись</Link>
                          </span>
                        </p>
                      </div>
                    )}
                  </ModalView>,
                  document.body
                )}
            </div>
          </div>
        </article>
        <ToastContainer />
      </section>
    </>
  );
};

export default BookingPage;
