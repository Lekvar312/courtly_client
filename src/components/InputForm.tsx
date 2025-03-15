import React from 'react'

type Input = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type?: string,
  placeholder: string, 
  label: string,
  value: string
}

const InputForm :React.FC<Input> = ({onChange, type="text", placeholder, label, value} ) => {
  return (
    <span className='flex flex-col'>
      <label htmlFor="email-input" className='font-lg'>{label}</label>
      <input className='border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all'
        placeholder={placeholder} 
        type={type} 
        value={value}
        onChange={onChange}/>
  </span>
  )
}

export default InputForm