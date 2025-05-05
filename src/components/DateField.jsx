import React from "react";
import { useFormContext } from "react-hook-form";

const DateField = ({ name, label, required }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="date"
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default DateField;