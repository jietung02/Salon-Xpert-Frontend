import RadioButtonOption from "./RadioButtonOption";

export default function RadioButton({ bookingMethod, label, name, handleOnChange, options }) {

  return (
    <div className="relative w-full flex flex-wrap mx-auto text-center">
      <span className="text-gray-500 text-lg w-full py-3">{label}</span>

      {options.length > 0 && options.map((value) => (
        <RadioButtonOption
          bookingMethod={bookingMethod}
          name={name}
          options={value}
          handleOnChange={handleOnChange}
        />
      ))}

    </div>
  );
}

