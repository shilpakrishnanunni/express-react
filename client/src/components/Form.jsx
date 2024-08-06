import { useState } from 'react';

const Form = ({ fields, submitButtonText, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((entries) => ({ ...entries, [name]: value }));
    setErrors((error) => ({ ...error, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.placeholder} is required.`;
      } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = `Invalid email address.`;
      }
    });
    console.log("ERRORs",newErrors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  return (
    <form onSubmit={handleSubmit} className="">
      {fields.map((field) => (
        <div key={field.name} className="form-field">
          <input
            type={field.type==="password" ? ( passwordVisibility ? "text" : "password" ) : field.type}
            name={field.name}
            value={formData[field.name] || ''}
            required={field.required}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="login-input-field"
          />
          {field.type === 'password' && (
              <span
                className="toggle-password-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? '👁️' : '👁️‍🗨️'}

              </span>
            )}
          {errors[field.name] && <div className="error-message">{errors[field.name]}</div>}
        </div>
      ))}
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};

export default Form;
