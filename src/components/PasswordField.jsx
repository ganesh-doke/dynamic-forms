import React from "react";
import { useFormContext } from "react-hook-form";

const PasswordField = ({ name, label, placeholder, required, minLength, maxLength, regex }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Function to extract invalid characters based on the regex
  const findInvalidCharacters = (value, regex) => {
    if (!regex || !value) return "";
    const invalidChars = value.split("").filter((char) => !new RegExp(regex).test(char));
    return invalidChars.join(", ");
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="password"
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
          minLength: minLength
            ? {
                value: minLength,
                message: `${label} must be at least ${minLength} characters long`,
              }
            : undefined,
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `${label} must be no more than ${maxLength} characters long`,
              }
            : undefined,
          validate: (value) => {
            if (regex && value && !new RegExp(regex).test(value)) {
              const invalidChars = findInvalidCharacters(value, regex);
              return `Invalid characters: ${invalidChars}`;
            }
            return true;
          },
        })}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default PasswordField;