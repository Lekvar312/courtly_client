import TableActionButtons from "./TableActionButtons"

interface TableColumn {
  key: string
  label: string
}

interface TableProps {
  columns: TableColumn[]
  data: any[]
  onEdit: (user: any) => void
  onDelete: (id:string) => void
}

const DashboardTable = ({ columns, data, onDelete, onEdit }: TableProps) => {

  if (!data || data.length === 0) {
    return <div>Немає даних для відображення</div>
  }

  return (
    <>
    <table className="table-auto min-w-full shadow-lg rounded-2xl overflow-hidden">
      <thead className='bg-stone-400 text-white text-center text-lg font-medium'>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="border-2 border-white  px-4 py-2">
              {column.label}
            </th>
          ))}
          <th className='border-2 border-white  px-4 py-2'>Дії</th>
        </tr>
      </thead>
      <tbody className="text-center bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-100">
            {columns.map((column) => (
              <td key={column.key} className="font-medium px-4 py-2 border border-gray-200">
                {column.key === "picture" ? <img src={import.meta.env.VITE_BASE_URL  + row[column.key]} className="w-full h-28 rounded object-cover" alt="picture"/> : row[column.key] }
              </td>
            ))}
            <td className=' ont-medium px-4 py-2 border border-gray-200'>
              <div className='flex justify-center items-center gap-3'>
                <TableActionButtons onEdit={() => onEdit(row)}/>
                <TableActionButtons onDelete={() => onDelete(row._id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  )
}

export default DashboardTable