import React from 'react'
import { Court } from '../type'

interface CourtCardProps {
  court: Court;
}

const CourtCard:React.FC<CourtCardProps> = ({court}) => {
  return (
  <li 
      key={court._id}
      className='w-full sm:w-89 mb-3 sm:mb-6 cursor-pointer transition-all shadow-2xl hover:scale-105 min-h-80 overflow-hidden rounded sm:rounded-2xl'>
      <article className='border-1  h-full border-gray-300  flex justify-between flex-col gap-2.5'>
        <img className='w-full  h-40 object-cover' src={`${import.meta.env.VITE_BASE_URL + court.picture}`} alt={court.name} />
        <div className='px-4'>
          <h2 className='text-xl capitalize font-medium  text-center'>{court.name}</h2>
          <p>{court.address}</p>
          <p>{court.type}</p>
          <span className='flex justify-between'>
            <p>{court.workingHours.startTime + "/" + court.workingHours.endTime }</p>
            <b>{court.price} грн.</b>
          </span>
        </div>
        <button className='bg-sky-500 py-2 text-white font-semibold cursor-pointer transition-all hover:bg-sky-600'>Перейти до замовлення</button>
      </article>
  </li>
  )
}

export default CourtCard