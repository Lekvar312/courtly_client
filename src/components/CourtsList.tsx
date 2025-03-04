import {useState, useEffect} from 'react'

import { fetchCourts } from '../services/CourtsService';
import { Court } from '../type';
import CourtCard from './CourtCard';

const CourtsList = () => {

const [courts, setCourts] = useState<Court[]>([]);  
const [error, setError] = useState<string| null> (null)

  useEffect(() => {
    fetchCourts()
      .then((response) => {
        if(response) setCourts(response)
      })
      .catch((error) => {
        console.error("Помилка при заваентаження майданчиків", error)
        setError("Не вдалося завантажити данні, спробуйте пізніше")
      })
  },[]);

  return (
    <>
      {error ? (
        <h2 className='text-center mt-16 text-red-600 text-4xl pt-1/2 align-middle capitalize'>
        {error}
      </h2> 
      ) : courts.length ? (
      <ul className='flex flex-wrap items-center justify-center sm:justify-center md:justify-between mt-6 gap-2.5'>
        {courts.map((court) => (
          <CourtCard key= {court._id} court={court}/>
        ))}
      </ul>
    ) : (<h2 className='text-center mt-16 text-4xl pt-1/2 align-middle capitalize'>заваентаження...</h2>)}
    </>
  );
}
export default CourtsList
