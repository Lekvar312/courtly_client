import { useEffect, useReducer, useState } from "react";
import { deleteCourt, fetchCourts } from "../services/CourtsService";
import { Court } from "../type";
import DashboardTable from "./DashboardTable";
import CourtTypes from "./CourtTypes";
import { createPortal } from "react-dom";
import ModalView from "./ModalView";
import { getAllTypes } from "../services/CourtTypes";
import CourtsCreateForm from "./CourtsCreateForm";
import CourtEditForm from "./CourtEditForm";
import { showToast } from "./ToastNotification";
import { ToastContainer } from "react-toastify";
import { Search } from "lucide-react";
import useDebounce from "../hooks/useDebounce";

const columns = [
  { key: "_id", label: "ID" },
  { key: "name", label: "Імя" },
  { key: "type", label: "Тип майданчика" },
  { key: "price", label: "Ціна/год" },
  { key: "address", label: "Адреса" },
  { key: "workingHours", label: "Робочі години" },
  { key: "picture", label: "Зображення" },
];

type Type = {
  _id: string;
  name: string;
};

type State = {
  courts: Court[];
  isModalOpen: boolean;
  selectedCourt: Court | null;
  types: Type[];
  modalType: "create" | "edit" | null;
  searchTerm: string;
};

type Actions =
  | { type: "SET_COURTS"; payload: Court[] }
  | { type: "TOGGLE_MODAL"; payload: boolean }
  | { type: "GET_TYPES"; payload: Type[] }
  | { type: "SET_SELECTED_COURT"; payload: Court | null }
  | { type: "CREATE_NEW_COURT"; payload: Court }
  | { type: "DELETE_COURT"; payload: string }
  | { type: "UPDATE_COURT"; payload: Court }
  | { type: "SET_MODAL_TYPE"; payload: "create" | "edit" | null }
  | { type: "SEARCH"; payload: string };

const initialState: State = {
  courts: [],
  isModalOpen: false,
  selectedCourt: null,
  types: [],
  modalType: null,
  searchTerm: "",
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "SET_COURTS":
      return { ...state, courts: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: action.payload };
    case "SET_SELECTED_COURT":
      return { ...state, selectedCourt: action.payload };
    case "GET_TYPES":
      return { ...state, types: action.payload };
    case "SET_MODAL_TYPE":
      return { ...state, modalType: action.payload };
    case "CREATE_NEW_COURT":
      return { ...state, courts: [...state.courts, action.payload] };
    case "DELETE_COURT":
      return { ...state, courts: state.courts.filter((c) => c._id !== action.payload) };
    case "UPDATE_COURT":
      return {
        ...state,
        courts: state.courts.map((c) => (c._id === action.payload._id ? action.payload : c)),
      };
    case "SEARCH":
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

const DashboardCourts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedSearch = useDebounce(state.searchTerm, 300);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);

  useEffect(() => {
    const getData = async () => {
      const courtsResponse = await fetchCourts();
      const typesResponse = await getAllTypes();
      dispatch({ type: "SET_COURTS", payload: courtsResponse });
      dispatch({ type: "GET_TYPES", payload: typesResponse });
    };
    getData();
  }, []);

  useEffect(() => {
    const filtered = state.courts.filter(
      (court) =>
        court.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        court.address.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        court.type?.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredCourts(filtered);
  }, [debouncedSearch, state.courts]);

  const openEditModal = (court: Court) => {
    dispatch({ type: "TOGGLE_MODAL", payload: true });
    dispatch({ type: "SET_MODAL_TYPE", payload: "edit" });
    dispatch({ type: "SET_SELECTED_COURT", payload: court });
  };

  const openCreateModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: true });
    dispatch({ type: "SET_MODAL_TYPE", payload: "create" });
  };

  const handleCreateCourt = (newCourt: Court) => {
    dispatch({ type: "CREATE_NEW_COURT", payload: newCourt });
  };

  const handleEditCourt = async (updatedCourt: Court) => {
    dispatch({ type: "UPDATE_COURT", payload: updatedCourt });
    showToast("Майданчик успішно оновлено", "success");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourt(id);
      dispatch({ type: "DELETE_COURT", payload: id });
      showToast("Майданчик успішно видалено", "success");
    } catch (error) {
      console.error("Помилка при видаленні:", error);
      showToast("Не вдалось видалити майданчик", "error");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Панель Адміністратора: Спортивні Майданчики</h2>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <CourtTypes />

        <button onClick={openCreateModal} className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded text-lg">
          Додати Майданчик
        </button>
      </div>
      <div className="flex w-full ">
        <div className="w-full max-w-md flex items-center border border-slate-300 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
          <span className="px-3 text-slate-400">
            <Search size={20} />
          </span>
          <input
            value={state.searchTerm}
            onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
            placeholder="Пошук по імені, адресі або типу..."
            className="w-full py-2 pr-4 bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <DashboardTable columns={columns} data={filteredCourts} onDelete={handleDelete} onEdit={openEditModal} />

      {state.isModalOpen &&
        createPortal(
          <ModalView onClose={() => dispatch({ type: "TOGGLE_MODAL", payload: false })}>
            {state.modalType === "create" && <CourtsCreateForm types={state.types} onCreate={handleCreateCourt} />}
            {state.modalType === "edit" && state.selectedCourt && (
              <CourtEditForm
                onUpdate={handleEditCourt}
                types={state.types}
                selectedCourt={state.selectedCourt}
                closeModal={() => dispatch({ type: "TOGGLE_MODAL", payload: false })}
              />
            )}
          </ModalView>,
          document.body
        )}
      <ToastContainer />
    </>
  );
};

export default DashboardCourts;
