import React from "react";
import { useFormContext } from "react-hook-form";

const NumberField = ({ name, label, placeholder, required, min, max }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
          min: {
            value: min,
            message: `Value must be greater than or equal to ${min}`,
          },
          max: {
            value: max,
            message: `Value must be less than or equal to ${max}`,
          },
        })}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default NumberField;