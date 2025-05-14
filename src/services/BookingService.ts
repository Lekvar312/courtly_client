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

    const [day, month, year] = date.split(".");
    const fullDate = `20${year}-${month}-${day}`;

    const timeSlots = time.map((t) => {
      const [hours, minutes] = t.split(":");
      const dateObj = new Date(`${fullDate}T${hours}:${minutes}:00`);
      return dateObj.toISOString();
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

export const deleteBooking = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`${import.meta.env.VITE_BASE_URL}/booking/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBooking = async (id: string, updateData: any) => {
  try {
    const { data } = await axiosInstance.put(`${import.meta.env.VITE_BASE_URL}booking/${id}`, updateData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
