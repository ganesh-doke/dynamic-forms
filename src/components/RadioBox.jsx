import React from "react";
import { useFormContext } from "react-hook-form";

const RadioBox = ({ name, label, options, required }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-group">
      <label>{label}</label>
      <div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              value={option.value}
              {...register(name, {
                required: required ? `${label} is required` : false,
              })}
            />
            {option.label}
          </label>
        ))}
      </div>
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default RadioBox;