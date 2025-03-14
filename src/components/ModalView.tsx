import { X } from 'lucide-react'
import React from 'react'

type Modal = {
  onClose: () => void
  children:React.ReactNode
}

const ModalView:React.FC<Modal> = ({onClose, children}) => {
  return (
    <section onClick={onClose} className='w-full h-full bg-black/50 fixed inset-0 flex flex-col items-center justify-center backdrop-blur-xs'>
    <div onClick={(e) => e.stopPropagation()} className='bg-white relative text-black rounded-xl p-4 w-96'>
      {/* <button type='button' onClick={onClose} className=' rounded-full absolute right-1 top-1 bg-red-600 text-transparent hover:text-white font-bold text-xl cursor-pointer transition-all'><X size={15} /></button> */}
      <button type='button' onClick={onClose} className=' rounded-full absolute right-1 top-1 text-red-600 hover:bg-red-600 hover:text-white  font-bold text-xs cursor-pointer transition-all'><X size={20}/></button>
      {children}
    </div>
  </section>
  )
}

export default ModalView