import '../../styles/loginPage.css';
import { hooks } from '../../hooks/login.hooks';
import Form from '../Form.jsx';

export default function LoginForm({ handleClick }) {
  const mutation = hooks.useLoginSubmit();

  const handleSubmit = (formData) => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        console.log('login successful', data);
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
          { name: 'username', type: 'text', placeholder: 'USERNAME' },
          { name: 'password', type: 'password', placeholder: 'PASSWORD' }
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
}
