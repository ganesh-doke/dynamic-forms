import React from "react";
import { useFormContext } from "react-hook-form";

const CurrencyField = ({ name, label, placeholder, required, min, max }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Invalid currency format (e.g., 123.45)",
          },
          validate: {
            minValue: (value) =>
              min === undefined || parseFloat(value) >= min || `Value must be at least ${min}`,
            maxValue: (value) =>
              max === undefined || parseFloat(value) <= max || `Value must not exceed ${max}`,
          },
        })}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default CurrencyField;