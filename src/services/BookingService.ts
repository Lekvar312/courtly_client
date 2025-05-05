import axios from "axios";
import axiosInstance from "../api/axiosInstance";

type BookingDataType = {
  userId: string;
  courtId: string | undefined;
  time: string[];
  date: string;
};

export const getAllBookings = async () => {
  try {
    const { data } = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/booking`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createBooking = async (bookingData: BookingDataType) => {
  try {
    const { userId, courtId, date, time } = bookingData;

    // Перетворення "10:00" -> ISO дата на основі обраної дати
    const [day, month, year] = date.split(".");
    const fullDate = `20${year}-${month}-${day}`; // "2025-05-06"

    const timeSlots = time.map((t) => {
      const [hours, minutes] = t.split(":");
      const dateObj = new Date(`${fullDate}T${hours}:${minutes}:00`);
      return dateObj.toISOString(); // або просто `dateObj` якщо бек приймає об'єкти
    });

    const payload = {
      courtId,
      userId,
      date: new Date(`${fullDate}T00:00:00`).toISOString(),
      timeSlots,
    };

    const { data } = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/booking`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
