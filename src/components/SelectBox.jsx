import React from "react";
import { useFormContext } from "react-hook-form";

const SelectBox = ({ name, label, options, required }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default SelectBox;