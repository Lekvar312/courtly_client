import { useEffect, useState } from "react";
import DashboardTable from "./DashboardTable";
import { deleteBooking, getAllBookings, updateBooking } from "../services/BookingService";
import { fetchCourts } from "../services/CourtsService";
import { getAllUsers } from "../services/UserService";

import { showToast } from "./ToastNotification";
import { ToastContainer } from "react-toastify";
import { createPortal } from "react-dom";
import ModalView from "./ModalView";
import { Court } from "../type";
import InputForm from "./InputForm";
import { ChevronDown, ChevronUp } from "lucide-react";
import { X } from "lucide-react";

type Booking = {
  courtId: string;
  "courtId._id": string;
  "courtId.name": string;
  "courtId.address": string;
  date: string;
  timeSlots: string[];
  "userId.email": string;
  "userId.name": string;
  "userId._id": string;
  _id: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const columns = [
  { key: "_id", label: "ID" },
  { key: "courtId", label: "Майданчик" },
  { key: "courtId.address", label: "Адреса" },
  { key: "userId.name", label: "Ім`я користувача" },
  { key: "userId.email", label: "Контакти користувача" },
  { key: "date", label: "Дата" },
  { key: "timeSlots", label: "Заброньований час" },
];

const DasboardBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [toggleTimeSlotButton, setToggleTimeSlotButton] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookingToUpdate, setBookingToUpdate] = useState<Booking>();
  const [courts, setCourts] = useState<Court[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [reloadBookings, setReloadBookings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const bookingsData = await getAllBookings();

      const formattedBookings = bookingsData.map((booking: any) => ({
        _id: booking._id,
        courtId: booking.courtId?.name || "—",
        "courtId._id": booking.courtId?._id || "-",
        "courtId.address": booking.courtId?.address || "—",
        "userId.name": booking.userId?.name || "—",
        "userId.email": booking.userId?.email || "—",
        date: booking.date ? new Date(booking.date).toLocaleDateString("uk-UA") : "—",
        timeSlots: Array.isArray(booking.timeSlots)
          ? booking.timeSlots.map((slot: string) => new Date(slot).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
          : [],
      }));

      const courtData = await fetchCourts();

      const usersData = await getAllUsers();

      setUsers(usersData);

      setCourts(courtData);

      setBookings(formattedBookings);
    };
    fetchData();
  }, [reloadBookings]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      setBookings(() => bookings.filter((b) => b._id !== id));
      showToast("Успішно видалено бронювання", "success");
    } catch (error) {
      console.log(error);
      showToast("Не вдалось видалити", "error");
    }
  };
  const handleUpdateBooking = (updateBooking: Booking) => {
    setIsModalOpen(true);
    setBookingToUpdate(updateBooking);
    setSelectedCourt(updateBooking["courtId._id"]);
    setSelectedUser(updateBooking["userId._id"]);
    const parts = updateBooking.date.split(".");
    const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
    setSelectedDate(formatted);
    console.log(updateBooking);
  };

  const handleSubmitUpdate = async (e: HTMLFormElement) => {
    e.preventDefault();
    if (!bookingToUpdate) return;
    try {
      await updateBooking(bookingToUpdate._id, {
        courtId: selectedCourt ? selectedCourt : bookingToUpdate["courtId._id"],
        userId: selectedUser ? selectedUser : bookingToUpdate["userId._id"],
        date: selectedDate ? new Date(selectedDate).toISOString() : bookingToUpdate.date,
      });
      showToast("Успішно новлено бронювання", "success");
      setIsModalOpen(false);
      setSelectedCourt("");
      setSelectedUser("");
      setReloadBookings((prev) => !prev);
    } catch (error) {
      console.log(error);
      showToast("Не вдалося оновити бронювання", "error");
      setSelectedCourt("");
      setSelectedUser("");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Панель Адміністратора: Бронювання</h1>
      <div className="w-full  max-h-[800px]  overflow-y-scroll">
        <DashboardTable columns={columns} data={bookings} onDelete={handleDelete} onEdit={handleUpdateBooking} />
      </div>
      {isModalOpen &&
        createPortal(
          <ModalView
            onClose={() => {
              setIsModalOpen(false);
              setToggleTimeSlotButton(false);
            }}
          >
            <h1 className="py-5">
              Редагувати бронювання <b> {bookingToUpdate?._id}</b>
            </h1>
            <form className=" flex flex-col gap-2">
              <span>
                <label htmlFor="select-other-court" className="text-lg">
                  Обрати інший майданчик
                </label>
                <select
                  value={selectedCourt}
                  id="select-other-court"
                  className="border focus:outline-0  focus:ring-1 focus:ring-purple-500 w-full py-2 rounded border-gray-400 "
                  onChange={(e) => setSelectedCourt(e.target.value)}
                >
                  <option value="" disabled>
                    {bookingToUpdate?.courtId}
                  </option>
                  {courts.map((court) => (
                    <option key={court._id} value={court._id}>
                      {court.name}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <label htmlFor="select-other-user" className="text-lg">
                  Обрати іншого користувача
                </label>
                <select
                  id="select-other-user"
                  className="border focus:outline-0 focus:ring-1 focus:ring-purple-500 w-full py-2 rounded border-gray-400 "
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="" disabled>
                    {bookingToUpdate?.["userId.name"]}
                  </option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </span>
              <InputForm
                placeholder="Оберіть дату"
                type="date"
                label="Дата бронювання"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
              />

              <button
                onClick={(e) => handleSubmitUpdate(e)}
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer py-1.5 rounded text-white font-bold"
              >
                Редагувати
              </button>
            </form>
          </ModalView>,
          document.body
        )}
      <ToastContainer />
    </section>
  );
};

export default DasboardBookings;
