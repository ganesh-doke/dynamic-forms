import React from "react";
import { useFormContext } from "react-hook-form";

const EmailField = ({ name, label, placeholder, required }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="email"
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email format",
          },
        })}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default EmailField;