import {
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function CheckboxOption({ disabled, checkBoxGroupName, selectedServices, handleOnChange, uniqueID, value }) {
  return (
    <div className="w-full">
      <div role="button" className="flex items-center w-full py-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-gray-900">
        <label htmlFor={uniqueID} className="flex items-center w-full px-3 pt-2 cursor-pointer">
          <div className="grid mr-2 place-items-center">
            <div className="inline-flex items-center">
              <label className="relative flex items-center p-0 rounded-lg cursor-pointer" htmlFor={uniqueID}>
                <input
                  disabled={disabled}
                  type="checkbox"
                  id={uniqueID}
                  name={checkBoxGroupName}
                  value={uniqueID}
                  checked={selectedServices && selectedServices.includes(uniqueID)}
                  onChange={(e) => { handleOnChange(e) }}
                  className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-lg border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-lg before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <CheckCircleIcon className="h-9 w-9 stroke-blue-gray-900 " stroke="black" />
                </span>
              </label>
            </div>
          </div>
          <p className="block text-xl 2xl:text-2xl antialiased font-normal leading-relaxed text-gray-900">
            {value}
          </p>
        </label>
      </div>
    </div>
  );
};