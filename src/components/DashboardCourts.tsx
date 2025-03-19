import {useEffect, useReducer} from 'react'
import { deleteCourt, fetchCourts } from '../services/CourtsService'
import { Court } from '../type'
import DashboardTable from './DashboardTable'
import CourtTypes from './CourtTypes'
import { createPortal } from 'react-dom'
import ModalView from './ModalView'
import { getAllTypes } from '../services/CourtTypes'
import CourtsCreateForm from './CourtsCreateForm'
import CourtEditForm from './CourtEditForm'

const columns = [
  {key:"_id", label: "ID"},
  {key:"name", label: "Імя"},
  {key:"type", label: "Тип майданчика"},
  {key:"price", label: "Ціна/год"},
  {key:"address", label: "Адреса"},
  {key:"workingHours", label: "Робочі години"},
  {key:"picture", label: "Зображення"},
]

type Type = {
  _id: string,
  name: string
}

type State = {
  courts: Court[],
  isModalOpen: boolean,
  selectedCourt: Court | null,
  types: Type[]
  modalType: "create" | "edit" | null,
}

type Actions = 
| {type: "SET_COURTS", payload: Court[]}
| {type: "TOGGLE_MODAL", payload: boolean}
| {type: "GET_TYPES", payload: Type[]}
| {type: "SET_SELECTED_COURT", payload: Court | null}
| {type: "CREATE_NEW_COURT", payload: Court}
| {type: "DELETE_COURT", payload: string}
| {type: "UPDATE_COURT", payload: Court}
| {type: "SET_MODAL_TYPE", payload: "create" | "edit" | null}

const initialState: State = {
  courts: [],
  isModalOpen: false,
  selectedCourt: null,
  types: [],
  modalType: null
}

const reducer = (state: State, action: Actions) => {
  switch(action.type) {
    case "SET_COURTS": {
      return {
        ...state,
        courts: action.payload
      }
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        isModalOpen: action.payload
      }
    }
    case "SET_SELECTED_COURT" : {
      return {
        ...state,
        selectedCourt: action.payload
      }
    }
    case "GET_TYPES": {
      return{ 
        ...state,
        types: action.payload
      }
    }
    case "SET_MODAL_TYPE" : {
      return {
        ...state,
        modalType: action.payload
      }
    }
    case "CREATE_NEW_COURT": {
        return {
          ...state,
          courts: [...state.courts, action.payload]
        }
    }
    case "DELETE_COURT": {
      return {
        ...state,
        courts: state.courts.filter(court => court._id !== action.payload)
      }
    }
    case "UPDATE_COURT": {
      return {
        ...state,
        courts: state.courts.map(court => 
          court._id === action.payload._id ? action.payload : court
        )
      };
    }
    
    default: return state
  }
}

const DashboardCourts = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const getData = async () => {
      const courtsResponse = await fetchCourts()
      const typesResponse = await getAllTypes ()
      dispatch({type:"SET_COURTS", payload: courtsResponse})
      dispatch({type:"GET_TYPES", payload:typesResponse})
    }
    getData()
  },[])

  const openEditModal = (court: Court) => {
      dispatch({type: "TOGGLE_MODAL", payload: true})
      dispatch({type: "SET_MODAL_TYPE", payload: "edit"})
      dispatch({type: "SET_SELECTED_COURT", payload: court })
  }

  const openCreateModal = () => {
    dispatch({type: "TOGGLE_MODAL", payload: true})
    dispatch({type: "SET_MODAL_TYPE", payload: "create"})
  }
  
  const handleCreateCourt = (newCourt: Court) => {
    console.log(newCourt)
    dispatch({type:"CREATE_NEW_COURT", payload: newCourt});
  }

  const handleEditCourt = async (updatedCourt: Court) => {
    dispatch({ type: "UPDATE_COURT", payload: updatedCourt });
  };
  
  

  const handleDelete = async (id: string) => {
    try {
      await deleteCourt(id);
      dispatch({ type:"DELETE_COURT", payload: id});
    } catch (error) { 
      console.error("Помилка при видаленні:", error);
    }
  }

  return (
    <>
      <h2 className='text-2xl font-bold'>Панель Адміністратора: Спортивні Майданчики </h2>
      <div className='flex justify-between'>
      <CourtTypes/>
      <button onClick={openCreateModal} className='bg-green-500 cursor-pointer text-white px-2 rounded text-lg font-normal'>Додати Майданчик</button>
      </div>
      <DashboardTable columns={columns} data={state.courts || []} onDelete={handleDelete} onEdit={openEditModal} />
      {state.isModalOpen && 
      createPortal(
        <ModalView onClose={() => dispatch({type:"TOGGLE_MODAL", payload: false})}>
          {state.modalType === 'create' && <CourtsCreateForm types={state.types} onCreate={handleCreateCourt}/>}
          {state.modalType === 'edit' && state.selectedCourt && <CourtEditForm  onUpdate = {handleEditCourt} types={state.types}  selectedCourt = {state.selectedCourt} />}
        </ModalView>, document.body
      )}
    </>
  )
}

export default DashboardCourts