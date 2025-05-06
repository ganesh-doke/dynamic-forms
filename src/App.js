import React from "react";
import DynamicForm from "./components/DynamicForm";
import form from "./data/form.json"; // Import the JSON file

const App = () => {
  return (
    <div className="App">
      <DynamicForm form={form} />
      <br></br>
    </div>
  );
};

export default App;