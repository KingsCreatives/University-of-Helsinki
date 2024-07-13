import React from "react";

const InputForm = ({ label, onChange, value, type, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} name={name} />
    </div>
  );
};

export default InputForm;
