import DropdownOption from "./DropdownOption";

export default function Dropdown({ disabled, isSelected, label, name, handleOnChange, loadSelection, options, goTop }) {
  return (
    <div className={`relative md:w-2/5 w-full h-10 mx-auto flex items-center justify-center ${goTop !== undefined && goTop === 'Yes'? 'mb-auto': ''}`}>
      {( !disabled && !isSelected) && <label
        className="select-none pointer-events-none absolute left-3 text-blue-gray-500 font-normal !overflow-visible truncate leading-tight transition-all text-sm text-gray-500"
      >
        {label}
      </label>}
      <select
        value={isSelected !== null ? isSelected : loadSelection || ''}
        // selected={isSelected ? isSelected : (loadSelection || -1)}
        disabled={disabled}
        name={name}
        onChange={(e) => { handleOnChange(e) }}
        className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent  text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
        required
      >
        {options.length > 0 && options.map((item) => {
          return <DropdownOption label={item.label} value={item.value} />
        })};

      </select>
    </div>
  );
}