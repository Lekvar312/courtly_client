import { useState, useEffect, useRef } from "react";
import { ChevronUp, Search } from "lucide-react";
import { fetchCourts } from "../services/CourtsService";
import { Court } from "../type";
import CourtCard from "./CourtCard";
import useDebounce from "../hooks/useDebounce";
import { ArrowDownUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { getAllTypes } from "../services/CourtTypes";

type CourtType = {
  _id: string;
  name: string;
};

const CourtsList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [filterButton, setFilterButton] = useState<string | null>(null);
  const [priceFilterStatus, setPriceFilterStatus] = useState<boolean>(false);
  const [courtTypes, setCourtTypes] = useState<CourtType[] | null>(null);

  const typeFilterBlock = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const sortByPrice = priceFilterStatus ? "desc" : "asc";
        const data = await fetchCourts(debouncedSearchTerm, sortByPrice, typeFilter);
        const courtTypesData = await getAllTypes();
        setCourtTypes(courtTypesData);
        setCourts(data);
      } catch (error) {
        setError("Не вдалося завантажити дані, спробуйте пізніше ...");
      }
    };
    const handleClickOtside = (event: MouseEvent) => {
      if (typeFilterBlock.current && !typeFilterBlock.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    getData();
    document.addEventListener("click", handleClickOtside);
    return () => document.removeEventListener("click", handleClickOtside);
  }, [debouncedSearchTerm, priceFilterStatus, typeFilter]);

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
            <div ref={typeFilterBlock} className="relative">
              <button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className={`bg-sky-500 flex gap-1 items-center hover:bg-sky-600 text-white font-bold cursor-pointer rounded-xl py-2 px-3 ${
                  isFilterOpen ? "rounded-b-none" : "rounded-brounded-xl"
                }`}
              >
                {filterButton ? filterButton : "За типом"}
                {isFilterOpen ? <ChevronUp /> : <ChevronDown />}
                {isFilterOpen && (
                  <ul className="absolute z-10 w-full rounded-xl rounded-t-none top-full bg-sky-500  left-0">
                    {courtTypes?.map((type) => (
                      <li
                        onClick={() => {
                          setTypeFilter(type._id);
                          setFilterButton(type.name);
                        }}
                        key={type._id}
                        className=" text-white font-medium py-2 hover:bg-white hover:text-sky-600 "
                      >
                        {type.name}
                      </li>
                    ))}
                    <li
                      onClick={() => {
                        setFilterButton(null);
                        setTypeFilter("");
                      }}
                      className=" text-white font-medium py-2 bg-red-500 hover:bg-white hover:text-red-500  rounded-b-xl"
                    >
                      Скинути
                    </li>
                  </ul>
                )}
              </button>
            </div>
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
