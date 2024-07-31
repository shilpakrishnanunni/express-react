import { useState } from 'react';

const Form = ({ fields, submitButtonText, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name,value)
    console.log(formData)
    setFormData((entries) => ({ ...entries, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="login-input-field"
        />
      ))}
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};

export default Form;
