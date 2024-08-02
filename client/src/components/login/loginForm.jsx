import '../../styles/loginPage.css';
import { hooks } from '../../hooks/login.hooks.js';
import Form from '../Form.jsx';

const LoginForm = ({ handleClick, onLogin }) => {
  const mutation = hooks.useLoginSubmit();

  const handleSubmit = (formData) => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        console.log('login successful', data);
        onLogin(data.user.id);
      },
      onError: (error) => {
        console.error('login error', error);
      }
    });
  };

  return (
    <div className="login-box">
      <span>Welcome back.</span>
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
