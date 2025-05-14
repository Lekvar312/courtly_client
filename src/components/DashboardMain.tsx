import React, { useState, useEffect } from "react";
import { fetchCourts } from "../services/CourtsService";
import { getAllBookings } from "../services/BookingService";
import { getAllUsers } from "../services/UserService";
import { getAllTypes } from "../services/CourtTypes";
import { Court } from "../type";
import { ListCheckIcon, User, User2Icon, VolleyballIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Bookings = {
  _id: string;
  courtId: {
    _id: string;
    name: string;
    address: string;
  };
  date: string;
  timeSlots: string[];
  userId: { _id: string; name: string; email: string };
};

const DashboardMain = () => {
  const [user, setUsers] = useState([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setBookings(await getAllBookings());
        const courtsData = await fetchCourts();
        const bookingsData = await getAllBookings();
        const usersData = await getAllUsers();
        const typesData = await getAllTypes();

        setCourts(courtsData);
        setBookings(bookingsData);
        setUsers(usersData);
        setTypes(typesData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Панель Адімністратора, Головна сторінка</h1>
      <div className="flex flex-col md:flex-row justify-center md:justify-start gap-2">
        <article className="bg-blue-400 rounded-xl p-5 text-center text-white  w-full md:w-96 h-40 flex flex-col justify-center items-start gap-4">
          <div className="flex justify-between w-full">
            <span className="flex flex-col justify-start items-start">
              <h1 className="text-4xl font-bold">{bookings.length} </h1>
              <h4 className="text-2xl font-bold">Бронювання</h4>
            </span>
            <div className="bg-white w-12 rounded-full p-2 flex items-center justify-center h-12">
              <ListCheckIcon className="text-blue-400" strokeWidth="2" size={50} />
            </div>
          </div>
          <Link to={"bookings"}>
            <p className="font-medium cursor-pointer hover:underline">Детальніше</p>
          </Link>
        </article>

        <article className="bg-green-400 rounded-xl p-5 text-center text-white w-full md:w-96 h-40 flex flex-col justify-center items-start gap-4">
          <div className="flex justify-between w-full">
            <span className="flex flex-col justify-start items-start">
              <h1 className="text-4xl font-bold">{courts.length} </h1>
              <h4 className="text-2xl font-bold">Майданчики</h4>
            </span>
            <div className="bg-white w-12 rounded-full p-2 flex items-center justify-center h-12">
              <VolleyballIcon className="text-green-400" strokeWidth="2" size={50} />
            </div>
          </div>
          <Link to={"courts"}>
            <p className="font-medium cursor-pointer hover:underline">Детальніше</p>
          </Link>
        </article>

        <article className="bg-orange-400 rounded-xl p-5 text-center text-white w-full md:w-96 h-40 flex flex-col justify-center items-start gap-4">
          <div className="flex justify-between w-full">
            <span className="flex flex-col justify-start items-start">
              <h1 className="text-4xl font-bold">{user.length} </h1>
              <h4 className="text-2xl font-bold">Користувачі</h4>
            </span>
            <div className="bg-white w-12 rounded-full p-2 flex items-center justify-center h-12">
              <User2Icon className="text-orange-400" strokeWidth="2" size={50} />
            </div>
          </div>
          <Link to={"users"}>
            <p className="font-medium cursor-pointer hover:underline">Детальніше</p>
          </Link>
        </article>
      </div>
    </section>
  );
};

export default DashboardMain;
