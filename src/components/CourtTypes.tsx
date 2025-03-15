import {useState, useEffect} from 'react'
import TableActionButtons from './TableActionButtons'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { createCourtType, getAllTypes } from '../services/CourtTypes'
import { createPortal } from 'react-dom'
import ModalView from './ModalView'
import CourtTypeCreateModal from './CourtTypeCreateModal'


type CourtType = {
  _id: string
  name: string
}

const CourtTypes = () => {
  const [courtTypes, setCourtTypes] = useState<CourtType  [] | null>(null)
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [newType, setNewType] = useState<string>("")

  useEffect(()=>{
    const getCourtTypes = async () => {
      try{
        const response = await getAllTypes()
        setCourtTypes(response)
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }
    getCourtTypes()
  },[])

  const handleSubmit = async () => {
    if(!newType.trim()) return 
    createCourtType(newType)
  }

  return (
    <div className='flex gap-2'>
    <div className='relative flex flex-col w-60 items-start gap-4  bg-sky-500 text-white rounded'>
      <button onClick={() => setDropDown((prev) => !prev)} className='flex w-full  p-1 justify-between text-lg font-medium items-center gap-2 cursor-pointer'>
        <span>Типи майданчиків</span> {dropDown ? <ChevronUp /> : <ChevronDown />}
      </button>
      {dropDown && (
        <ul className='absolute top-full overflow-y-auto left-0 mt-1 w-full max-h-56 text-black p-2 bg-gray-300 shadow-lg rounded z-10 flex flex-col gap-2 '>
          {courtTypes?.map(type => (
            <li key={type._id} className='p-1 font-medium text-base flex items-center justify-between  bg-white rounded '>
              <h4 >{type.name}</h4> 
              <span className='flex gap-1.5'>
                <TableActionButtons onEdit={() => {
                  setShowModal(true)
                }}/>
                <TableActionButtons onDelete={() => {}}/>
              </span>
            </li>
          ))}
        </ul>
      )}
      </div>
      <button onClick={() => setShowModal(true)} className='bg-green-500 text-white px-2 rounded font-medium cursor-pointer'>Додати</button>
      {showModal &&
        createPortal(
          <ModalView onClose={() => setShowModal(false)} >
            <CourtTypeCreateModal isEdit={true}  onSubmit={handleSubmit} value={newType} onChange={(e) => setNewType(e.target.value)} />
          </ModalView>, document.body
        )
      }
    </div>
  )
}

export default CourtTypes