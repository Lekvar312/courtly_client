import { useReducer, useEffect } from "react";
import TableActionButtons from "./TableActionButtons";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createCourtType, deleteCourtType, editCourtType, getAllTypes } from "../services/CourtTypes";
import { createPortal } from "react-dom";
import ModalView from "./ModalView";
import CourtTypeCreateModal from "./CourtTypeCreateModal";
import { showToast } from "./ToastNotification";
import { ToastContainer } from "react-toastify";

type CourtType = {
  _id: string;
  name: string;
};

type State = {
  courtTypes: CourtType[];
  isDropdownOpen: boolean;
  newType: string;
  isModalOpen: boolean;
  editType: CourtType | null;
};

type Actions =
  | { type: "SET_COURT_TYPES"; payload: CourtType[] }
  | { type: "TOGGLE_DROPDOWN"; payload: boolean }
  | { type: "TOGGLE_MODAL"; payload: boolean }
  | { type: "SET_NEW_TYPE"; payload: string }
  | { type: "SET_EDIT_TYPE"; payload: CourtType | null }
  | { type: "UPDATE_COURT_TYPE"; payload: CourtType }
  | { type: "CREATE_COURT_TYPE"; payload: CourtType }
  | { type: "DELETE_COURT_TYPE"; payload: string };

const initialState: State = {
  courtTypes: [],
  isDropdownOpen: false,
  newType: "",
  isModalOpen: false,
  editType: null,
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_COURT_TYPES": {
      return {
        ...state,
        courtTypes: action.payload,
      };
    }
    case "TOGGLE_DROPDOWN": {
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen,
      };
    }
    case "SET_NEW_TYPE": {
      return {
        ...state,
        newType: action.payload,
      };
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        isModalOpen: action.payload,
      };
    }
    case "SET_EDIT_TYPE": {
      return {
        ...state,
        editType: action.payload,
      };
    }
    case "CREATE_COURT_TYPE": {
      return {
        ...state,
        courtTypes: [...state.courtTypes, action.payload],
      };
    }
    case "UPDATE_COURT_TYPE": {
      return {
        ...state,
        courtTypes: state.courtTypes.map((type) => (type._id === action.payload._id ? action.payload : type)),
      };
    }
    case "DELETE_COURT_TYPE": {
      return {
        ...state,
        courtTypes: state.courtTypes.filter((type) => type._id !== action.payload),
      };
    }
    default:
      return state;
  }
};

const CourtTypes = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getCourtTypes = async () => {
      try {
        const response = await getAllTypes();
        dispatch({ type: "SET_COURT_TYPES", payload: response });
      } catch (error) {
        console.log(error);
      }
    };
    getCourtTypes();
  }, []);

  const openCreateModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: true });
    dispatch({ type: "SET_EDIT_TYPE", payload: null });
    dispatch({ type: "SET_NEW_TYPE", payload: "" });
  };

  const handleEdit = (type: CourtType) => {
    dispatch({ type: "SET_EDIT_TYPE", payload: type });
    dispatch({ type: "SET_NEW_TYPE", payload: type.name });
    dispatch({ type: "TOGGLE_MODAL", payload: true });
  };

  const handleSubmit = async () => {
    if (!state.newType.trim()) return;

    try {
      let updatedCourtType;
      if (state.editType) {
        updatedCourtType = await editCourtType(state.editType._id, state.newType);
        if (!updatedCourtType?.data?.courtType) return false;
        dispatch({ type: "UPDATE_COURT_TYPE", payload: updatedCourtType.data.courtType });
        showToast("Успішно відредаговано тип", "success");
      } else {
        const newCourtType = await createCourtType(state.newType);
        if (!newCourtType?.data?.courtType) return console.log("Створення не вдалося");
        dispatch({ type: "CREATE_COURT_TYPE", payload: newCourtType.data.courtType });
        showToast("Успішно додано новий тип", "success");
      }
    } catch (error) {
      console.error("Помилка при збереженні:", error);
      showToast("Щось пішло не так", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourtType(id);
      dispatch({ type: "DELETE_COURT_TYPE", payload: id });
      showToast("Тип успішно видалено ", "success");
    } catch (error) {
      console.log(error);
      showToast("Не вдалось видалити тип", "error");
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex flex-col w-60 items-start gap-4  bg-sky-500 hover:bg-sky-600 transition-all text-white rounded">
        <button
          onClick={() => dispatch({ type: "TOGGLE_DROPDOWN", payload: !state.isDropdownOpen })}
          className="flex w-full  p-1 justify-between text-lg font-medium items-center gap-2 cursor-pointer"
        >
          <span>Типи майданчиків</span> {state.isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {state.isDropdownOpen && (
          <ul className="absolute top-full overflow-y-auto left-0 mt-1 w-full max-h-56 text-black p-2 bg-gray-100 shadow-lg rounded z-10 flex flex-col gap-2 ">
            {state.courtTypes.map((type) => (
              <li key={type._id} className="p-1 font-medium text-base flex items-center justify-between hover:bg-gray-200 bg-white rounded ">
                <h4 className="truncate w-40">{type.name}</h4>
                <span className="flex gap-1.5">
                  <TableActionButtons onEdit={() => handleEdit(type)} />
                  <TableActionButtons onDelete={() => handleDelete(type._id)} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={openCreateModal} className="bg-green-500 hover:bg-green-600 transition-all text-white px-2 rounded font-medium cursor-pointer">
        Додати
      </button>
      {state.isModalOpen &&
        createPortal(
          <ModalView onClose={() => dispatch({ type: "TOGGLE_MODAL", payload: false })}>
            <CourtTypeCreateModal
              onSubmit={handleSubmit}
              value={state.newType}
              onChange={(e) => dispatch({ type: "SET_NEW_TYPE", payload: e.target.value })}
              isEditing={!!state.editType}
            />
          </ModalView>,
          document.body
        )}
    </div>
  );
};

export default CourtTypes;
