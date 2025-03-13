import { X } from 'lucide-react'
import React from 'react'

type Modal = {
  onClose: () => void
  children:React.ReactNode
}

const ModalView:React.FC<Modal> = ({onClose, children}) => {
  return (
    <section onClick={onClose} className='w-full h-full bg-black/50  fixed inset-0 flex flex-col items-center justify-center'>
    <div onClick={(e) => e.stopPropagation()} className='bg-white relative text-black rounded-xl p-4 w-96'>
      <button type='button' onClick={onClose} className='absolute right-0 top-0 text-red-600 hover:scale-110 cursor-pointer transition-all p-1'><X size={30} /></button>
      {children}
    </div>
  </section>
  )
}

export default ModalView