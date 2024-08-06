import '../../styles/loginPage.css';
import { hooks } from '../../hooks/login.hooks';
import Form from '../Form.jsx';

const ForgotPasswordForm = ({ handleClick }) => {
  const mutation = hooks.useForgotPasswordSubmit();

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
        formType="forgotPassword"
        onSubmit={handleSubmit}
        submitButtonText="SEND EMAIL"
        fields={[{ name: 'email', type: 'email', placeholder: 'EMAIL', required: true }]}
      />
      <span>
        <a href="#" data-value="login" onClick={handleClick}>
          BACK
        </a>
      </span>
    </div>
  );
};

export default ForgotPasswordForm;
