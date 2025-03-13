import React, {useReducer} from 'react'
import { editUser } from '../services/UserService';

type Modal = {
  user: User | null
  onUpdate: () => void
  onClose: () => void
}

type User = {
  _id?: string,
  name: string,
  email: string,
  role: string,
}

type State = User & {
  error: string | null,
  loading: boolean
}

const initialState = (user: User): State => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  loading: false,
  error: null
});

type Actions = 
  | {type: "SET_NAME"; payload: string}
  | {type: "SET_EMAIL"; payload: string}
  | {type: "SET_ROLE"; payload: string}


const reducer = (state: State, action: Actions) => {
  switch(action.type){
    case 'SET_NAME' : {
      return{
        ...state,  name: action.payload 
      }
    }
    case 'SET_EMAIL' : {
      return {
        ...state,
        email: action.payload
      }
    }
    case 'SET_ROLE' : {
      return{
        ...state,
        role: action.payload
      }
    }
    default: 
      return state
  }
}

const UserEditModal: React.FC<Modal> = ({user, onClose, onUpdate}) => {
  
  if(!user || !user._id) return null
  const [state, dispatch] = useReducer(reducer, initialState(user))

  const handleEdit = async () => {
    if(!user) return 
    try {
      await editUser(state._id!, state)
      onUpdate()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <form  className='text-lg flex flex-col gap-5'>
          <span className='flex justify-between'>
          <h1 className='text-lg font-bold'>Редагування Користувача</h1>
          </span>
          <div className='flex flex-col gap-2'>
            <span className='flex flex-col'>
              <label htmlFor="name-input " className='font-medium'>Ім`я</label>
              <input className='border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all' 
                placeholder='Введіть імя' 
                type="text" 
                value={state.name}
                onChange={(e) => dispatch({type:"SET_NAME", payload: e.target.value})}
                id='name-input'/>
            </span>
            <span className='flex flex-col'>
              <label htmlFor="email-input" className='font-medium'>Пошта</label>
              <input className='border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all'
                placeholder='Введіть пошту' 
                type="text" 
                value={state.email}
                onChange={(e) => dispatch({type:"SET_EMAIL", payload: e.target.value})}
                id='email-input' />
            </span>
            <span className='flex flex-col'>
              <label htmlFor="role-select" className='font-medium'>Роль</label>
              <select id="role-select" className='border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all'
                value={state.role} 
                onChange={(e) => dispatch({type: "SET_ROLE", payload: e.target.value})} >
                <option value={"user"}>user</option>
                <option value={"admin"}>admin </option>
              </select>
            </span>
          </div>
            <span className='flex items-end justify-end gap-2'>
              <button type='button' onClick={handleEdit} className='  text-base p-1 transition-all text-black  font-medium cursor-pointer hover:bg-yellow-400 hover:text-white rounded'>{state.loading ? "Завантаження ..." : "Редагувати"}</button>
            </span>
        </form>
  )
}
export default UserEditModal 

