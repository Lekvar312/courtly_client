import { createCourt } from '../services/CourtsService'
import InputForm from './InputForm'
import React, { useReducer } from 'react'

type Type = {
  _id: string,
  name: string,
}

type CourtsActionFormProps = {
  types: Type[];
}

type State = {
  name: string,
  address: string,
  price: string,
  type: Type,
  workingHours: {
    startTime: string,
    endTime: string
  },
  picture: File | null,
}

const initialState: State = {
  name: "",
  address: "",
  price: "",
  type: { _id: "", name: "" },
  workingHours: {
    startTime: "",
    endTime: "",
  },
  picture: null
}

type Actions = 
| { type: "SET_NAME", payload: string }
| { type: "SET_ADDRESS", payload: string }
| { type: "SET_PRICE", payload: string }
| { type: "SET_TYPE", payload: Type }
| { type: "SET_WORKING_HOURS", payload: { startTime: string, endTime: string } }
| { type: "SET_PICTURE", payload: File | null }

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_WORKING_HOURS":
      return { ...state, workingHours: { ...state.workingHours, ...action.payload } };
    case "SET_PICTURE":
      return { ...state, picture: action.payload };
    default:
      return state;
  }
}

const CourtsCreateForm: React.FC<CourtsActionFormProps> = ({ types }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      await createCourt(state);
    } catch (error) {
      console.error('Error creating court', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <h1 className='text-lg font-bold'>Редагувати майданчик</h1>
      <div>
        <InputForm placeholder='Введіть назву' label='Назва' value={state.name} onChange={(e) => dispatch({type: "SET_NAME", payload: e.target.value})}/>
        <InputForm placeholder='Введіть адресу' label='Адреса' value={state.address} onChange={(e) => dispatch({type: "SET_ADDRESS", payload: e.target.value})}/>
        <InputForm placeholder='Введіть Ціну' label='Ціна' type='number' value={state.price} onChange={(e) => dispatch({type: "SET_PRICE", payload: e.target.value})}/>
        <span className='flex justify-between gap-2.5'>
        <InputForm 
          placeholder='Відкриття' 
          type='time' 
          label='Відкриття' 
          value={state.workingHours.startTime} 
          onChange={(e) => dispatch({
            type: "SET_WORKING_HOURS", 
            payload: { 
              startTime: e.target.value, 
              endTime: state.workingHours.endTime 
            }
          })} 
        />
        <InputForm 
          placeholder='Закриття' 
          type='time' 
          label='Закриття' 
          value={state.workingHours.endTime} 
          onChange={(e) => dispatch({
            type: "SET_WORKING_HOURS", 
            payload: { 
              startTime: state.workingHours.startTime, 
              endTime: e.target.value 
            }
          })} 
        />
        </span>
        <span className="flex flex-col"> 
          <label htmlFor="select">Тип майданчика</label>
          <select 
            className='border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all"'
            value={state.type._id}
            onChange={(e) => {
              const selectedType = types.find(type => type._id === e.target.value);
              dispatch({ type: "SET_TYPE", payload: selectedType! });
            }}
          >
            <option value="" disabled>Оберіть тип</option>
            {types.map(type => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </span>
        <InputForm placeholder='Зображення' type='file' label='Зображення' onChange={(e) => dispatch({type: "SET_PICTURE", payload: e.target.files?.[0] ?? null})} />
      </div>
      <div className='flex justify-end'>
        <button type="submit" className='bg-green-400 text-white p-2 font-medium rounded cursor-pointer hover:bg-green-500 transition-all'>Створити</button>
      </div>
    </form>
  );
}

export default CourtsCreateForm;
