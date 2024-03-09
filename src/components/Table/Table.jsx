export default function Table({ headers, data, handleEdit, handleDelete }) {

  return (
    <div class="relative overflow-auto shadow-md sm:rounded-lg md:mx-16 md:mt-16 mx-3 mt-3 mb-5 h-96">

      <table class="w-full text-xs text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-white uppercase bg-gray-900 ">
          <tr>
            {headers.map((header, index) => {
              return (<th key={index} scope="col" class="px-6 py-3">
                {header}
              </th>);
            })}

            {headers.length > 0 && (
              <th colSpan={headers.length < 4 ? 3 : 2} className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}

          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            return (<tr key={rowIndex} class="bg-white border-b bg-gray-200 text-gray-900 border-gray-100 hover:bg-gray-200">
              {row.map((cell, cellIndex) => {
                return (<td key={cellIndex} class="px-6 py-4">{cell !== null ? cell : '-'}</td>);
              })}
              <td class="px-6 py-4 text-right">
                <span onClick={() => handleEdit(row)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</span>
              </td>
              <td class="px-6 py-4 text-right">
                <span onClick={() => handleDelete(row[0])} class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Delete</span>
              </td>
            </tr>)
          })}
        </tbody>
      </table>

    </div>
  )
}