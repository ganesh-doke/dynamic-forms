# DynamicForm Component

The `DynamicForm` component is a React-based multi-step form builder that dynamically renders form fields and validates them. It is highly customizable and supports conditional visibility, validation, and review of the submitted form data.

## Features

- **Dynamic Field Rendering**: Form fields are dynamically generated based on a configuration object.
- **Multi-Step Navigation**: Supports navigation between multiple steps with validation on each step.
- **Conditional Visibility**: Fields can be shown or hidden based on the values of other fields.
- **Validation**: Ensures field-level validation, including required fields and regex patterns.
- **Review Step**: Provides a final review step to preview all entered data before submission.
- **React Hook Form Integration**: Leverages `react-hook-form` for efficient form state management and validation.

## Installation

To use the `DynamicForm` component, ensure you have the following dependencies installed in your project:

```bash
npm install react react-dom react-hook-form
```

## Usage

### Importing the Component

```javascript
import DynamicForm from "./DynamicForm";
```

### Required Props

The `DynamicForm` component expects a `form` object as a prop, which defines the configuration of the form. Below is an example structure:

```javascript
const formConfig = [
  {
    stepName: "Step 1",
    stepDescription: "Description for Step 1",
    fields: [
      {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter your username",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
    ],
  },
  {
    stepName: "Step 2",
    fields: [
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        required: true,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
        required: true,
      },
    ],
  },
  {
    stepName: "Review",
    fields: [],
  },
];

const form = {
  title: "Dynamic Multi-Step Form",
  formConfig,
};
```

### Rendering the Form

```javascript
<DynamicForm form={form} />
```

## Customization

### Field Types

The following field types are supported:

- **Text**: `text`
- **Password**: `password`
- **Email**: `email`
- **Checkbox**: `checkbox`
- **Select Box**: `select`
- **Radio Button**: `radio`
- **Label**: `label`
- **Text Area**: `textarea`
- **Date**: `date`
- **Currency**: `currency`
- **Number**: `number`

### Conditional Visibility

Fields can be shown or hidden based on the values of other fields by using the `visibilityDependency` property:

```javascript
{
  name: "additionalInfo",
  label: "Additional Info",
  type: "textarea",
  visibilityDependency: { field: "showAdditionalInfo", value: true },
}
```

### Validation

- Use the `required` property to make a field mandatory.
- Use the `minLength` and `maxLength` properties to enforce minimum and maximum character limits.
- Use the `regex` property to enforce custom validation patterns.

### Styling

The component uses `stepperStyles.css` for default styling. You can customize the styles by overriding the CSS classes in your project.

## Navigation Buttons

- **Back Button**: Allows users to navigate to the previous step.
- **Next Button**: Validates the current step and navigates to the next step.
- **Submit Button**: Displays on the final step and triggers form submission.

## Review Step

The review step displays all the entered form data in a summary format. If a field is not filled, it shows `Not provided`.

## Submission

On submission, the form data is logged to the console, and a success alert is displayed. You can customize the `onSubmit` handler to integrate with your backend or API.

```javascript
const onSubmit = (data) => {
  console.log("Form Data:", data);
  alert("Form submitted successfully!");
};
```

## Development

### Requirements

- Node.js
- React

### Running Locally

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm start`.

## License
