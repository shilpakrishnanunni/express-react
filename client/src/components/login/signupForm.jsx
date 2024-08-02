import '../../styles/loginPage.css';
import { hooks } from '../../hooks/login.hooks';
import Form from '../Form.jsx';

const SignUpForm = ({ handleClick }) => {
  const mutation = hooks.useSignUpSubmit();

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
      <Form
        formType="signup"
        onSubmit={handleSubmit}
        submitButtonText="SIGN UP"
        fields={[
          { name: 'username', type: 'text', placeholder: 'USERNAME', required: true },
          { name: 'email', type: 'email', placeholder: 'EMAIL', required: true },
          { name: 'password', type: 'password', placeholder: 'PASSWORD', required: true },
          { name: 'confirmPassword', type: 'password', placeholder: 'CONFIRM PASSWORD', required: true }
        ]}
      />
      <span>
        <a href="#" data-value="login" onClick={handleClick}>
          Login
        </a>
      </span>
    </div>
  );
};

export default SignUpForm;
