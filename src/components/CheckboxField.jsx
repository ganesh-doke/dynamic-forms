import React from "react";
import { useFormContext } from "react-hook-form";

const CheckboxField = ({ name, label }) => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <label>
        <input type="checkbox" {...register(name)} />
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;