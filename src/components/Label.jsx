import React from "react";

const Label = ({ label }) => {
  return (
    <div className="form-group">
      <label>
        <strong>{label}</strong>
      </label>
    </div>
  );
};

export default Label;