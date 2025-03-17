  import {useEffect, useReducer} from 'react'
  import { deleteCourt, fetchCourts } from '../services/CourtsService'
  import { Court } from '../type'
  import DashboardTable from './DashboardTable'
  import CourtTypes from './CourtTypes'
  import { createPortal } from 'react-dom'
  import ModalView from './ModalView'
  import { getAllTypes } from '../services/CourtTypes'
import CourtsCreateForm from './CourtsCreateForm'

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
    showModal: boolean,
    selectedCourt: Court | null,
    types: Type[]

  }

  type Actions = 
  | {type: "SET_COURTS", payload: Court[]}
  | {type: "SET_SHOW_MODAL", payload: boolean}
  | {type: "SET_EDIT", payload: {court: Court, showModal: boolean}}
  | {type: "GET_TYPES", payload: Type[]}

  const initialState: State = {
    courts: [],
    showModal: false,
    selectedCourt: null,
    types: []

  }

  const reducer = (state: State, action: Actions) => {
    switch(action.type) {
      case "SET_COURTS": {
        return {
          ...state,
          courts: action.payload
        }
      }
      case "SET_SHOW_MODAL": {
        return {
          ...state,
          showModal: action.payload
        }
      }
      case "SET_EDIT": {
        return {
          ...state, 
          selectedCourt: action.payload.court,
          showModal: action.payload.showModal,
        }
      }
      case "GET_TYPES": {
        return{ 
          ...state,
          types: action.payload
        }
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

    const handleDelete = async (id: string) => {
      try {
        const response =  await deleteCourt(id);
        dispatch({ type: "SET_COURTS", payload: state.courts.filter(court => court._id !== id) });
        return response
      } catch (error) { 
        console.error("Помилка при видаленні:", error);
      }
    };

    return (
      <>
        <h2 className='text-2xl font-bold'>Панель Адміністратора: Спортивні Майданчики </h2>

        <div className='flex justify-between'>
        <CourtTypes />
        <button onClick={() => dispatch({type:"SET_SHOW_MODAL", payload:true})} className='bg-green-500 cursor-pointer text-white px-2 rounded text-lg font-normal'>Додати Майданчик</button>
        </div>
        <DashboardTable columns={columns} data={state.courts || []} onDelete={handleDelete} onEdit={() => {}} />

        {state.showModal && 
        createPortal(
          <ModalView onClose={() => dispatch({type:"SET_SHOW_MODAL", payload: false})}>
            <CourtsCreateForm types={state.types}/>
          </ModalView>, document.body
        )}
      </>
    )
  }

  export default DashboardCourts