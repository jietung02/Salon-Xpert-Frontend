export default function Table({ headers, data, handleEdit, handleDelete, customHeight }) {

  return (
    <div class={`relative rounded-xl shadow-md my-14 lg:w-11/12 mx-5 lg:mx-auto overflow-auto ${customHeight && customHeight === true ? 'custom-height-dashboard' : 'custom-height-default'} bg-white`}>

      <table class="w-full text-base 2xl:text-xl text-left rtl:text-right text-gray-500">
        <thead class="text-base 2xl:text-xl text-white uppercase bg-gray-900 ">
          <tr>
            {headers.map((header, index) => {
              return (<th key={index} scope="col" class="px-6 py-3">
                {header}
              </th>);
            })}

            {headers.length > 0 && handleEdit && handleDelete && (
              <th colSpan={headers.length < 4 ? 3 : 2} className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}

          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 && data.map((row, rowIndex) => {
            return (<tr key={rowIndex} class="bg-white border-b text-gray-900 border-gray-100 hover:bg-gray-200">
              {row.map((cell, cellIndex) => {
                return (<td key={cellIndex} class="px-6 py-4">{cell !== null ? cell : '-'}</td>);
              })}
              {handleEdit && handleDelete && (
                <>
                  <td class="px-6 py-4 text-right">
                    <span onClick={() => handleEdit(row)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <span onClick={() => handleDelete(row[0])} class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Delete</span>
                  </td>
                </>
              )}
            </tr>)
          })}
        </tbody>
      </table>

    </div>
  )
}