import TableActionButtons from "./TableActionButtons";

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  onEdit: (row: any) => void;
  onDelete: (id: string) => void;
}

const DashboardTable = ({ columns, data, onDelete, onEdit }: TableProps) => {
  if (!data || data.length === 0) {
    return <div>Немає даних для відображення</div>;
  }

  return (
    <>
      <div className="overflow-y-auto ">
        <table className="table-auto min-w-full shadow-lg rounded-2xl">
          <thead className="bg-linear-to-r from-sky-500 to-teal-500 text-white text-center text-lg font-medium">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="border-2 border-white px-4 py-2">
                  {column.label}
                </th>
              ))}
              <th className="border-2 border-white px-4 py-2">Дії</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {columns.map((column) => (
                  <td key={column.key} className="font-medium px-4 py-2 border border-gray-200">
                    {column.key === "picture" ? (
                      <img src={import.meta.env.VITE_BASE_URL + row[column.key]} className="w-full h-20 rounded object-cover" alt="picture" />
                    ) : column.key === "workingHours" && row[column.key] ? (
                      `${row[column.key]?.startTime ?? "—"} - ${row[column.key]?.endTime ?? "—"}`
                    ) : Array.isArray(row[column.key]) ? (
                      <div className="flex flex-wrap gap-1 justify-start">
                        {row[column.key].map((slot: string, i: number) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {slot}
                          </span>
                        ))}
                      </div>
                    ) : typeof row[column.key] === "object" && row[column.key] !== null ? (
                      row[column.key].name ?? "—"
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
                <td className="font-medium px-4 py-2 border border-gray-200">
                  <div className="flex justify-center items-center gap-3">
                    <TableActionButtons onEdit={() => onEdit(row)} />
                    <TableActionButtons onDelete={() => onDelete(row._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardTable;
