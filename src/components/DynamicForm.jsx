import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Stepper from "./Stepper";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import CheckboxField from "./CheckboxField";
import EmailField from "./EmailField";
import SelectBox from "./SelectBox";
import RadioBox from "./RadioBox";
import Label from "./Label";
import TextArea from "./TextArea";
import DateField from "./DateField";
import CurrencyField from "./CurrencyField";
import NumberField from "./NumberField";
import "../styles/stepperStyles.css";

const fieldComponents = {
  text: TextField,
  password: PasswordField,
  checkbox: CheckboxField,
  email: EmailField,
  select: SelectBox,
  radio: RadioBox,
  label: Label,
  textarea: TextArea,
  date: DateField,
  currency: CurrencyField,
  number: NumberField,
};

const DynamicForm = ({ form }) => {
  const formConfig = form.formConfig;
  const methods = useForm({
    mode: "onBlur", // Validate fields when they lose focus
  });
  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  const handleNext = async () => {
    // Validate only visible fields in the current step
    const visibleFields = formConfig[currentStep].fields
      .filter((field) => isVisible(field, methods.watch()))
      .map((field) => field.name);

    const isValid = await methods.trigger(visibleFields);

    if (isValid) {
      // Proceed to the next step if validation passes
      if (currentStep < formConfig.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      console.log("Validation failed for the current step.");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Function to check field visibility
  const isVisible = (field, formValues) => {
    if (!field.visibilityDependency) return true; // If no visibilityDependency, always show
    const { field: dependency, value } = field.visibilityDependency;
    return formValues[dependency] === value;
  };

  const renderReviewStep = () => {
    const formData = methods.getValues(); // Get all form values
    return (
      <div className="review-step">
        {formConfig.map((step, stepIndex) => (
          <div key={stepIndex} className="review-step-section">
            {step.fields.length > 0 && <h3>{step.stepName}</h3>}
            <ul className="review-list">
              {step.fields.map((field) => (
                <li key={field.name}>
                  <strong>{field.label}:</strong>{" "}
                  {formData[field.name] || "Not provided"}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <h1 className="form-title">{form.title}</h1>
      {formConfig[currentStep].stepDescription &&
      (<div className="form-sub-title">{formConfig[currentStep].stepDescription}</div>)
      }
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stepper
          steps={formConfig}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
        <div className="form-step">
          {/* Render fields or review step */}
          {currentStep < formConfig.length - 1 ? (
            formConfig[currentStep].fields.map((field) => {
              const Component = fieldComponents[field.type];
              if (!Component) return null;

              // Dynamically monitor the form state
              const formValues = methods.watch();
              const visible = isVisible(field, formValues);

              // Append an asterisk (*) to the label if the field is required
              const label = field.required ? `${field.label} *` : field.label;

              // Render only visible fields
              return (
                visible && (
                  <Component
                    key={field.name}
                    name={field.name}
                    label={label}
                    placeholder={field.placeholder}
                    options={field.options}
                    required={field.required}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    regex={field.regex}
                  />
                )
              );
            })
          ) : (
            renderReviewStep()
          )}
        </div>
        <div className="form-navigation">
          {/* Back Button */}
          {currentStep > 0 && (
            <button type="button" className="back-button" onClick={handleBack}>
              ← Back
            </button>
          )}
          {/* Next or Submit Button */}
          {currentStep < formConfig.length - 1 ? (
            <button type="button" className="next-button" onClick={handleNext}>
              Next →
            </button>
          ) : (
            <button type="button" className="submit-button" onClick={methods.handleSubmit(onSubmit)}>
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default DynamicForm;