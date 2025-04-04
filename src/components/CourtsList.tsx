import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { fetchCourts } from "../services/CourtsService";
import { Court } from "../type";
import CourtCard from "./CourtCard";
import useDebounce from "../hooks/useDebounce";

const CourtsList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCourts(debouncedSearchTerm);
        setCourts(data);
      } catch (error) {
        setError("Не вдалося завантажити дані, спробуйте пізніше ...");
      }
    };
    getData();
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="mt-5 w-full p-1 flex flex-col items-center justify-center gap-5">
        <div className="w-full max-w-md flex items-center border border-slate-300 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
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
