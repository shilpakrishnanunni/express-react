import { useState } from "react";
import "../../styles/loginPage.css";
import LoginForm from "./loginForm.jsx";
import SignUpForm from "./signupForm.jsx";
import ForgotPasswordForm from "./forgotPasswordForm.jsx";

export default function Login() {
    const [formState, setFormState] = useState("login") // login, signup, forgotPassword
    const handleClick = (e) => {
        e.preventDefault()
        setFormState(e.target.getAttribute('data-value'))
    }

    return (
        <div className="login-container">
            {formState=="login" && < LoginForm handleClick={handleClick} />}
            {formState=="signup" && < SignUpForm handleClick={handleClick}/>}
            {formState=="forgotPassword" && < ForgotPasswordForm handleClick={handleClick}/>}

        </div>
    );
}