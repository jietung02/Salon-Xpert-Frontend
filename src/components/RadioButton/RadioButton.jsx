import RadioButtonOption from "./RadioButtonOption";

export default function RadioButton({ bookingMethod, label, name, handleOnChange, options, type }) {

  return (
    <div className={`relative w-full flex flex-wrap mx-auto ${type && type === 'scale'? ' lg:px-32 2xl:px-40': ''} px-0 text-center ${type && type === 'category' ? 'mt-8': ''}`}>
      <span className="text-gray-500 text-lg 2xl:text-xl w-full py-3 mb-2 ">{label}</span>

      {options.length > 0 && options.map((value) => (
        <RadioButtonOption
          bookingMethod={bookingMethod}
          name={name}
          options={value}
          handleOnChange={handleOnChange}
          type={type}
        />
      ))}

    </div>
  );
}

