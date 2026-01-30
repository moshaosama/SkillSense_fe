import type { UseFormRegister, FieldError } from "react-hook-form";
import cn from "../../../utils/cn";

const Inputs = ({
  label,
  placeholder,
  type,
  name,
  register,
  error,
}: {
  label: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  name: string;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "border border-gray-300 p-2 rounded-xl",
          error ? "border-red-500" : "border-gray-300",
        )}
        {...register(name, { required: true })}
      />

      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default Inputs;
