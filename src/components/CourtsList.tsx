import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { fetchCourts } from "../services/CourtsService";
import { Court } from "../type";
import CourtCard from "./CourtCard";
import useDebounce from "../hooks/useDebounce";
import { ArrowDownUp } from "lucide-react";
import { ChevronDown } from "lucide-react";

const CourtsList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [priceFilterStatus, setPriceFilterStatus] = useState<boolean>(false); // Статус фільтру ціни

  useEffect(() => {
    const getData = async () => {
      try {
        // Передаємо sortByPrice в залежності від стану priceFilterStatus
        const sortByPrice = priceFilterStatus ? "desc" : "asc"; // Якщо true - від дорогих до дешевих, інакше навпаки
        const data = await fetchCourts(debouncedSearchTerm, sortByPrice); // Передаємо параметр сортування
        setCourts(data);
      } catch (error) {
        setError("Не вдалося завантажити дані, спробуйте пізніше ...");
      }
    };
    getData();
  }, [debouncedSearchTerm, priceFilterStatus]); // Додаємо priceFilterStatus в залежності

  return (
    <>
      <div className="mt-5 w-full p-1 flex flex-col items-center justify-center gap-5">
        <div className="w-full flex flex-col gap-4 justify-center relative items-start md:items-center">
          <div className="w-full lg:max-w-md flex justify-center items-center border border-slate-300 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500 transition">
            <span className="px-3 text-slate-400">
              <Search size={20} />
            </span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Пошук..."
              className="w-full py-2 pr-4 bg-transparent focus:outline-none"
            />
          </div>
          <div className="self-end lg:absolute right-0 flex gap-2">
            <button
              onClick={() => setPriceFilterStatus((prev) => !prev)}
              className="  flex gap-2 justify-between focus:outline-0 bg-sky-500 hover:bg-sky-600 text-white py-2 px-3 rounded-xl font-bold cursor-pointer "
            >
              {priceFilterStatus ? "Дорожчі" : "Дешевші"}
              <ArrowDownUp strokeWidth={2} />
            </button>
            <button className="bg-sky-500 flex gap-1 items-center hover:bg-sky-600 text-white font-bold cursor-pointer rounded-xl py-2 px-3">
              За типом <ChevronDown />
            </button>
          </div>
        </div>
      </div>
      {error && <h1 className="text-2xl, font-bold text-red-500">{error}</h1>}
      {courts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-items-center items-center">
          {courts.map((court) => (
            <CourtCard key={court._id} court={court} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-2xl">Нічого не знайдено</p>
      )}
    </>
  );
};
export default CourtsList;
