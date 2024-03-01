import { ReactComponent as CircleIcon } from "../../assets/circleIcon.svg";

export default function RadioButtonOption({ bookingMethod, name, options, handleOnChange }) {

  return (
    <div role="button" className="flex flex-row items-center mx-auto p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-gray-900">
      <input
        name={name}
        id={options.id}
        value={options.value}
        type="radio"
        checked={bookingMethod === options.value}
        onChange={(e) => { handleOnChange(e) }}
        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
      <label htmlFor={options.id} className="relative cursor-pointer">
        <span className={`absolute text-gray-900 transition-opacity opacity-${bookingMethod === options.value ? '100' : '0'} pointer-events-none left-[-16px] top-1/2 -translate-y-1/2 mr-0 `}>
          <CircleIcon className="h-3 w-3" />
        </span>
        <p className="block text-base antialiased text-base leading-relaxed text-gray-900 px-3">
          {options.label}
        </p>
      </label>

    </div>
  );
};