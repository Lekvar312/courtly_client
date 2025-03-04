import React, { useState } from 'react'


const Login:React.FC = () => {

  const[ email, setEmail ] = useState<string>("")
  const[ password, setPassword ] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(email, password)
    e.preventDefault()
  }

  return (
    <section className='w-full h-full flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='border h-96 border-slate-200 py-5 shadow-2xl flex items-center flex-col rounded w-96 bg-white'>
        <h2 className='text-2xl font-medium text-center mb-4'>Увійти</h2>
        <div className='w-full px-6 flex flex-col justify-center gap-5'>
          <span className='flex flex-col gap-1'>
            <label htmlFor='email-input' className='text-lg'>Електронна Пошта</label>
            <input className='h-9 border border-slate-300 px-2 w-full rounded' 
              type='email' 
              placeholder='Введіть пошту ' 
              id='email-input' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </span>
          <span className='flex flex-col gap-1'>
            <label htmlFor='password-input' className='text-lg'>Пароль</label>
            <input className='h-9 border border-slate-300 px-2 w-full rounded' 
              type='password' 
              placeholder='Введіть пароль' 
              id='password-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </span>
          <button  type="submit" className='bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer py-2.5 text-white font-medium rounded w-full'>
            Увійти
          </button>
          <p className='text-center'>Немає облікового запису? 
            <span className='text-sky-500 hover:text-sky-600 hover:underline cursor-pointer'> Зареєструватись</span>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Login