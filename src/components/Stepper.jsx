import React from "react";
import "../styles/stepperStyles.css";

const Stepper = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index <= currentStep ? "active" : ""}`}
          onClick={() => onStepChange(index)}
        >
          <div className="step-circle">{index + 1}</div>
          <div className="step-label">{step.stepName}</div>
          {index < steps.length - 1 && (
            <div className="step-line"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;