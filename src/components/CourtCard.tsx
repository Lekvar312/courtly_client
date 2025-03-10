import React from 'react'
import { Court } from '../type'

interface CourtCardProps {
  court: Court;
}

const CourtCard:React.FC<CourtCardProps> = ({court}) => {
  return (
  <li 
      key={court._id}
      className='w-full md:w-89 mb-3 md:mb-6 cursor-pointer transition-all shadow-2xl hover:scale-105 h-80 overflow-hidden rounded md:rounded-2xl'>
      <article className='border-1  h-full border-gray-300 flex flex-col justify-between'>
        <img className='w-full h-40 object-cover' src={`${import.meta.env.VITE_BASE_URL + court.picture}`} alt={court.name} />
        <div className='px-4'>
          <h2 className='md:text-lg text-xl font-bold  capitalize  text-center'>{court.name}</h2>
          <p className='text-base sm:text-lg font-medium transition-all'>{court.address}</p>
          <p className='italic md:not-italic'>{court.type}</p>
          <span className='flex justify-between'>
            <p className='italic md:not-italic'>{court.workingHours.startTime + "/" + court.workingHours.endTime }</p>
            <b className='text-lg transition-all font-bold md:text-base'>{court.price} грн.</b>
          </span>
        </div>
        <button className='bg-sky-500 py-2 text-white font-semibold cursor-pointer transition-all hover:bg-sky-600'>Перейти до замовлення</button>
      </article>
  </li>
  )
}

export default CourtCard