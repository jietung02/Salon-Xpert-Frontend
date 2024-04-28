import { ReactComponent as CircleIcon } from "../../assets/circleIcon.svg";


export default function RadioButtonOption({ bookingMethod, name, options, handleOnChange, type }) {

  return (
    <div role="button" className={`relative flex flex-row ${type && type === 'scale' ? 'w-full sm:w-1/5' : type === 'category' ? 'w-full' : ''} items-center justify-center mx-auto p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-gray-900 mb-4`}>
      <div>
        <input
          name={name}
          id={options.id}
          value={options.value}
          type="radio"
          checked={bookingMethod === options.value}
          onChange={(e) => { handleOnChange(e) }}
          className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-7 before:w-7 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
      </div>
      <label htmlFor={options.id} className="relative flex items-center cursor-pointer">
        <span className={`relative text-gray-900 transition-opacity opacity-${bookingMethod === options.value ? '100' : '0'} pointer-events-none left-[-22px] ${type === 'category' ? 'top-1.5' : 'top-1.5 bottom-3'} -translate-y-1/2 mr-0 `}>
          <CircleIcon className="h-4 w-4 mr-2" />
        </span>
        <p className={`flex-1 block text-base antialiased text-xl 2xl:text-2xl leading-relaxed text-gray-900 px-3`}>
          {options.label}
        </p>
      </label>

    </div>
  );

};