import {useReducer, useEffect} from 'react'
import TableActionButtons from './TableActionButtons'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { createCourtType, deleteCourtType, editCourtType, getAllTypes } from '../services/CourtTypes'
import { createPortal } from 'react-dom'
import ModalView from './ModalView'
import CourtTypeCreateModal from './CourtTypeCreateModal'

type CourtType = {
  _id: string,
  name: string
}

type State = {
  courtTypes: CourtType[],
  dropDownMenu: boolean,
  newType:string
  showModal: boolean,
  editType: CourtType | null
}

type Actions = 
  |{type: "SET_COURT_TYPES", payload:CourtType[]}
  |{type: "SET_DROP_DOWN_MENU", payload: boolean }
  |{type: "SET_SHOW_MODAL", payload: boolean}
  |{type: "SET_NEW_TYPE", payload: string}
  |{type: "SET_EDIT_TYPE", payload: CourtType | null}

const initialState:State = {
  courtTypes: [],
  dropDownMenu: false,
  newType: "",
  showModal:false,
  editType: null
}

const reducer = (state: State, action: Actions) => {
  switch(action.type) {
    case "SET_COURT_TYPES": {
      return {
        ...state,
        courtTypes: action.payload
      }
    }
    case "SET_DROP_DOWN_MENU": {
      return {
        ...state, 
        dropDownMenu: action.payload
      }
    }
    case "SET_NEW_TYPE": {
      return {
        ...state, 
        newType: action.payload
      }
    }
    case "SET_SHOW_MODAL": {
      return {
        ...state,
        showModal: action.payload
      }
    }
    case "SET_EDIT_TYPE": {
      return {
        ...state,
        editType: action.payload
      }
    }
    default: return state
  }
}

const CourtTypes = () => {
  const [state,dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    const getCourtTypes = async () => {
      try{
        const response = await getAllTypes()
        dispatch({type: "SET_COURT_TYPES", payload: response})
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }
    getCourtTypes()
  },[])

  const handleEdit = (type: CourtType) => {
    dispatch({type: "SET_EDIT_TYPE", payload: type})
    dispatch({type: "SET_NEW_TYPE", payload: type.name})
    dispatch({type: "SET_SHOW_MODAL", payload: true})
  }

  const handleSubmit = async () => {
    if(!state.newType.trim()) return 
    if(state.editType) {
      editCourtType(state.editType._id, state.newType)
    }else {
      createCourtType(state.newType)
    }
  }

  const handleDelete = async (id: string) => {
    try{
      await deleteCourtType(id)
      dispatch({type: "SET_COURT_TYPES", payload: state.courtTypes.filter(type => type._id !== id ) })
    }catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='flex gap-2'>
    <div className='relative flex flex-col w-60 items-start gap-4  bg-sky-500 text-white rounded'>
      <button onClick={() => dispatch({type: "SET_DROP_DOWN_MENU", payload: !state.dropDownMenu}) } className='flex w-full  p-1 justify-between text-lg font-medium items-center gap-2 cursor-pointer'>
        <span>Типи майданчиків</span> {state.dropDownMenu ? <ChevronUp /> : <ChevronDown />}
      </button>
      {state.dropDownMenu && (
        <ul className='absolute top-full overflow-y-auto left-0 mt-1 w-full max-h-56 text-black p-2 bg-gray-100 shadow-lg rounded z-10 flex flex-col gap-2 '>
          {state.courtTypes.map(type => (
            <li key={type._id} className='p-1 font-medium text-base flex items-center justify-between hover:bg-gray-200 bg-white rounded '>
              <h4 className='truncate w-40' >{type.name}</h4> 
              <span className='flex gap-1.5'>
                <TableActionButtons onEdit={() => handleEdit(type)}/>
                <TableActionButtons onDelete={() => handleDelete(type._id)}/>
              </span>
            </li>
          ))}
        </ul>
      )}
      </div>
      <button onClick={() => {
        dispatch({type: "SET_EDIT_TYPE", payload: null})
        dispatch({type: "SET_NEW_TYPE", payload: ""})
        dispatch({type: "SET_SHOW_MODAL", payload: !state.showModal})
      }
        } className='bg-green-500 text-white px-2 rounded font-medium cursor-pointer'>Додати</button>
      {state.showModal &&
        createPortal(
          <ModalView 
            onClose={() => dispatch({type: "SET_SHOW_MODAL", payload: !state.showModal})} >
            <CourtTypeCreateModal
              onSubmit={handleSubmit}
              value={state.newType}
              onChange={(e) => dispatch({type: "SET_NEW_TYPE", payload: e.target.value})}
              isEditing={!!state.editType}
              />
          </ModalView>, document.body
        )
      }
    </div>
  )
}

export default CourtTypes