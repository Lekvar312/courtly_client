import {useState, useEffect} from 'react'
import { fetchCourts } from '../services/CourtsService'
import { Court } from '../type'
import DashboardTable from './DashboardTable'

const columns = [
  {key:"_id", label: "ID"},
  {key:"name", label: "Імя"},
  {key:"type", label: "Тип майданчика"},
  {key:"price", label: "Ціна/год"},
  {key:"address", label: "Адреса"},
  {key:"picture", label: "Зображення"},
]

const DashboardCourts = () => {
  const [courts, setCourts] = useState<Court[] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const response = await fetchCourts()
      setCourts(response)
    }
    getData()
  },[])


  return (
    <>
      <h2 className='text-2xl font-bold'>Панель Адміністратора: Спортивні Майданчики </h2>
      <DashboardTable columns={columns} data={courts || []} onDelete={() => {}} onEdit={() => {}} />
    </>
  )
}

export default DashboardCourts