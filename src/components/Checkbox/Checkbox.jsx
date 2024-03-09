import CheckboxOption from "./CheckboxOption";

export default function Checkbox({ label, checkBoxGroupName, selectedServices, handleOnChange, options }) {
  return (
    <div className="relative md:w-2/5 w-full mx-auto">
      <span className="text-gray-500 px-3 py-2.5">{label}</span>

      {options.length > 0 && options.map((option) => {
        return (<CheckboxOption checkBoxGroupName={checkBoxGroupName} selectedServices={selectedServices} handleOnChange={handleOnChange} uniqueID={option.uniqueId} value={option.value} />);
      })}

    </div>
  );
};