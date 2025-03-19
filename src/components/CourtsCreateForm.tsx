import { createCourt } from '../services/CourtsService'
import { Court} from '../type'
import InputForm from './InputForm'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'

type CourtsActionFormProps = {
  types: Type[]
  onCreate: (newCourt: Court) => void
}

type Type = {
  _id: string,
  name: string
}

type FormData = {
  name: string,
  price: string,
  address: string,
  type: string
  workingHours: {
    startTime: string, 
    endTime: string
  }
  picture: File 
}

const CourtsCreateForm: React.FC<CourtsActionFormProps> = ({types, onCreate, }) => {

  const {register, handleSubmit, formState:{errors}} = useForm<FormData>()
  const [successMessage, setSuccessMessage] = useState<string | null>()
  const [selectedType, setSelectedType] = useState('');
  const onSubmit = async (data: FormData) => {
    try {
    console.log(data)
    const newCourt = await createCourt(data);
    onCreate(newCourt.court)
    setSuccessMessage("Майданчик успішно створено")
  } catch (error) {
    setSuccessMessage(null)
    console.log("Помилка при створенні майданчика:", error);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      {successMessage ? <p className='text-green-500 font-medium text-xl'>{successMessage}</p> :  <h1 className='text-lg font-bold'>Створити Майданчик</h1>}
      <div className='flex flex-col gap-2'>
        <InputForm placeholder='Введіть назву' label='Назва майданчика' {...register("name", {required: "Це обовязкове поле", maxLength: { value: 50, message: "Максимальна довжина назви - 50 символів" }})} error={errors.name?.message} />
        <InputForm placeholder='Введіть Адресу' label='Адреса майданчика' {...register("address", {required: "Це обовязкове поле"})} error={errors.address?.message} />
        <InputForm placeholder='Введіть Ціну за годину' label='Ціна майданчика' type='number' {...register("price", {required: "Це обовязкове поле"})} error={errors.price?.message} />
        <span className='flex flex-col'>
          <label className='font-medium'>Тип майданчика</label>
          <select className="border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all" value={selectedType} {...register("type")} onChange={(e) => {setSelectedType(e.target.value)}}>
            {types.map(type => 
              <option key={type._id} value={type.name}>{type.name}</option>
            )}
          </select>
        </span>
          <span className='flex w-full justify-between gap-2'>
            <InputForm placeholder='Час відкриття ' label='Час відкриття' type='time' {...register("workingHours.startTime", {required: "Це обовязкове поле"})} error = {errors.workingHours?.startTime?.message} />
            <InputForm placeholder='Час закриття ' label='Час закриття' type='time' {...register("workingHours.endTime", {required: "Це обовязкове поле"})} error = {errors.workingHours?.endTime?.message} />
          </span>
        <InputForm type='file' label='Зображення' placeholder='Оберіть зображення' {...register("picture")}/>
      </div>
      <button className='bg-green-500 py-2 rounded text-white cursor-pointer hover:bg-green-600 font-medium transition-all'>Створити</button>
    </form>
  );
}

export default CourtsCreateForm;
