import React from 'react'
import InputForm from './InputForm'

type CreateCourtType = {
  onSubmit: () => void,
  onChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
  value:string,
  isEdit:boolean
}

const CourtTypeCreateModal:React.FC<CreateCourtType> = ({onSubmit,isEdit, onChange, value}) => {
  return (
    <form onSubmit={ onSubmit} className='flex flex-col gap-2'>
      <h1 className='text-lg font-bold'>{isEdit ? "Створити новий тип майданчика":" Редагувати тип"}</h1>
      <InputForm value={value} onChange={onChange} label="Назва типу" placeholder ="Введіть назву" />
      <span className='flex justify-end'>
        <button type='submit' className='text-base p-1.5 transition-all  font-medium cursor-pointer hover:scale-105 bg-green-400 text-white rounded'> {isEdit ? "Створити" : "Редагувати"}</button>
      </span>
  </form>
  )
}

export default CourtTypeCreateModal