import {useState, useEffect} from 'react'

import { fetchCourts } from '../services/CourtsService';
import { Court } from '../type';
import CourtCard from './CourtCard';

const CourtsList = () => {

const [courts, setCourts] = useState<Court[]>([]);  

  useEffect(() => {
    fetchCourts()
      .then((response) => {
        if(response) setCourts(response)
      })
      .catch((error) => {
        console.error("Помилка при заваентаження майданчиків", error)
      })
  },[]);

  return (
    <div>
      <ul className='flex flex-wrap items-center justify-center sm:justify-center md:justify-between mt-6 gap-2.5'>
        {courts.map((court) => (
            <CourtCard key= {court._id} court={court}/>
          ))}
      </ul>
    </div>
  );
}
export default CourtsList
