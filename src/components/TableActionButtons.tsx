import {Trash, Edit} from 'lucide-react'

interface TableActionButton {
  onDelete?: () => void,
  onEdit?: () => void,
}

const TableActionButtons = ({onDelete, onEdit}: TableActionButton) => {
  return (
      <>
        {onEdit && (<button onClick={onEdit} className='bg-yellow-400 p-2 cursor-pointer hover:scale-105 transition-all rounded text-white'><Edit size={20}/></button>)}
        {onDelete &&(<button onClick={onDelete} className='bg-red-500 p-2 cursor-pointer hover:scale-105 transition-all rounded text-white'><Trash size={20}/></button>)}
      </>
  )
}

export default TableActionButtons