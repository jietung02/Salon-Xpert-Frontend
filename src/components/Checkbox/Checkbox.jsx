import CheckboxOption from "./CheckboxOption";

export default function Checkbox({ label, checkBoxGroupName, selectedServices, handleOnChange, options }) {
  return (
    <div className="relative md:w-2/5 w-full mx-auto">
      <span className="text-gray-500 px-3 py-2.5">{label}</span>

      {options.length > 0 && options.map((option) => {
        return (<CheckboxOption checkBoxGroupName={checkBoxGroupName} selectedServices={selectedServices} handleOnChange={handleOnChange} uniqueID={option.uniqueId} value={option.value} />);
      })}


      {/* <div className="flex flex-col py-3">
        <div className="w-full">
          <div role="button" className="flex items-center w-full pt-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-gray-900">
            <label htmlFor="vertical-list-react-1" className="flex items-center w-full px-3 pt-2 cursor-pointer">
              <div className="grid mr-2 place-items-center">
                <div className="inline-flex items-center">
                  <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="vertical-list-react-1">
                    <input id="vertical-list-react-1" type="checkbox" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <CheckCircleIcon className="h-8 w-8 stroke-blue-gray-900" stroke="black" />
                    </span>
                  </label>
                </div>
              </div>
              <p className="block text-xs antialiased font-normal leading-relaxed text-gray-900">
                Hair Cutyuiyiuy
              </p>
            </label>
          </div>
        </div>

        <div className="w-full">
          <div role="button" className="flex items-center w-full pt-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-gray-900">
            <label htmlFor="vertical-list-react-2" className="flex items-center w-full px-3 pt-2 cursor-pointer">
              <div className="grid mr-2 place-items-center">
                <div className="inline-flex items-center">
                  <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="vertical-list-react-2">
                    <input id="vertical-list-react-2" type="checkbox" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <CheckCircleIcon className="h-8 w-8 stroke-blue-gray-900" stroke="black" />
                    </span>
                  </label>
                </div>
              </div>
              <p className="block text-xs antialiased font-normal leading-relaxed text-gray-900">
                Hair Cutyuiyiuy
              </p>
            </label>
          </div>
        </div>
      </div> */}
    </div>
  );
};