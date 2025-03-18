import React from 'react'

type Input = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type?: string,
  placeholder: string, 
  label: string,
  value?: string,
  error?: string,
  [key: string]: any,
}

const InputForm :React.FC<Input> = ({onChange, type="text", placeholder, label, value, error, ...rest} ) => {
  return (
    <span className='flex flex-col w-full'>
      <label htmlFor="email-input" className='font-lg'>{label}</label>
      <input  className={`border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all ${type === 'file' && "h-20 border-dotted bg-gray-50 cursor-pointer hover:bg-gray-100"}`}
        placeholder={placeholder} 
        type={type} 
        value={value}
        onChange={onChange}
        {...rest}
        />
        {error && <span className='text-red-500'>{error}</span>}
    </span>
  )
}

export default InputForm