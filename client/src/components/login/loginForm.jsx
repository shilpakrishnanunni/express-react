import '../../styles/loginPage.css';
import { hooks } from '../../hooks/login.hooks.js';
import Form from '../Form.jsx';
import { useState } from 'react';

const LoginForm = ({ handleClick, onLogin }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const mutation = hooks.useLoginSubmit();

  const handleSubmit = async (formData) => {
    setErrorMessage('');
    await mutation.mutateAsync(formData, {
      onSuccess: (data) => {
        console.log('login successful', data);
        onLogin(data.user.id);
      },
      onError: (error) => {
        console.error('login error', error);
        setErrorMessage("Invalid username or password.");
      }
    });
  };

  return (
    <div className="login-box">
      <span className='welcome-message'>Welcome back.</span>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <Form
        formType="login"
        onSubmit={handleSubmit}
        submitButtonText="LOGIN"
        fields={[
          { name: 'username', type: 'text', placeholder: 'USERNAME', required: true },
          { name: 'password', type: 'password', placeholder: 'PASSWORD', required: true }
        ]}
      />
      <span>
        <a href="#" data-value="forgotPassword" onClick={handleClick}>
          Forgot Password?
        </a>
      </span>
      <span>
        New here?
        <a href="#" data-value="signup" onClick={handleClick}>
          Sign Up
        </a>
      </span>
    </div>
  );
};

export default LoginForm;
