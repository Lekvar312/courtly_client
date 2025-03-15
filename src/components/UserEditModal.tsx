import React, {useReducer} from 'react'
import { editUser } from '../services/UserService';
import InputForm from './InputForm';
import Select from './Select';

type Modal = {
  user: User | null
}

type Actions = 
  | {type: "SET_NAME"; payload: string}
  | {type: "SET_EMAIL"; payload: string}
  | {type: "SET_ROLE"; payload: string}

type User = {
  _id?: string,
  name: string,
  email: string,
  role: string,
}

const initialState = (user: User): User => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const reducer = (state: User, action: Actions) => {
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

const UserEditModal: React.FC<Modal> = ({user}) => {
  
  if(!user || !user._id) return null
  const [state, dispatch] = useReducer(reducer, initialState(user))

  const handleEdit = async () => {
    if(!user) return 
    try {
      await editUser(state._id!, state)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
      <form onSubmit={handleEdit} className='text-lg flex flex-col gap-5'>
        <h1 className='text-lg font-bold'>Редагування Користувача</h1>
        <div className='flex flex-col gap-2'>
          <InputForm label='Ім`я' onChange={(e) => dispatch({type:"SET_NAME", payload: e.target.value})} value={state.name} placeholder='Введіть ім`я'/>
          <InputForm label='Пошта' onChange={(e) => dispatch({type:"SET_EMAIL", payload: e.target.value})} value={state.email} placeholder='Введіть Пошту'/>
          <Select label="Роль" value={state.role} options={["admin", "user"]} onChange= {(e) => dispatch({type: "SET_ROLE", payload: e.target.value})}/>
          </div>
            <span className='flex items-end justify-end gap-2'>
              <button type='submit' className='text-base p-1.5 transition-all  font-medium cursor-pointer hover:scale-105 bg-yellow-400 text-white rounded'>Редагувати</button>
            </span>
        </form>
  )
}
export default UserEditModal 

