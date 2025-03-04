import React from 'react'

const Login:React.FC = () => {
  return (
    <section className='w-full h-full flex justify-center items-center'>
      <form className='border-1 border-slate-200 py-2.5 shadow-2xl flex justify-between flex-col rounded w-96 '>
        <h2 className='text-center mb-2.5 font-semibold text-2xl'>Авторизаці</h2>
        <div className='flex flex-col gap-4 px-2.5'>
          <span className='w-full flex flex-col gap-1'>
            <label htmlFor="email-input">Електронна Пошта</label>
            <input className="border-1 border-slate-400 w-full rounded h-9 px-1"  placeholder='Введвіть пошту'  type="text" id="email-input" />
          </span>
          <span className='flex flex-col gap-1'>
            <label htmlFor="email-input w-full">Електронна Пошта</label>
            <input className="border-1 border-slate-400 w-full rounded h-9 px-1" placeholder='Введвіть пароль' type="text" id="email-input" />
          </span>
          <button className=' py-1.5 rounded bg-sky-500 text-white cursor-pointer transition-all hover:bg-sky-600'>Увійти</button>
          <p className='text-gray-600 text-center'>Немає Аккаунту? 
            <span className=' text-sky-500 underline underline-offset-2 hover:text-sky-600 cursor-pointer'>Зараеєструватись</span>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Login