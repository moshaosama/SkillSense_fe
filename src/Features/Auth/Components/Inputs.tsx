const Inputs = ({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded-xl"
      />
    </div>
  );
};

export default Inputs;
