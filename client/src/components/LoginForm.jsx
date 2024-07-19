import "../styles/loginForm.css";

function LoginHeader() {
    return (
        <div className="login-header">
            <img src="/images/cat01.png" alt="" className="login-header-image" />
        </div>
    )
}

function LoginBody() {
    return (
        <div className="login-body">
                <form action="post" className="login-form">
                    {/* <label for="email">Email</label> */}
                    <input type="email" name="email" id="email" placeholder="Email" className="login-input" />
                    {/* <label for="password">Password</label> */}
                    <input type="password" name="password" id="password" placeholder="Password" className="login-input" />
                    <button type="submit" className="login-button" >Login</button>
                </form>
                <a href="" className="login-forgot-password-link">Forgot Password?</a>
            <span id="or" className="login-or">OR</span>
                Don't have an account?
                <a href=""  className="login-signup-link">Sign Up</a>

        </div>
    )
}

function RegisterCheck() {
    return (
        <div>
            
        </div>
    )
}

export default function LoginForm() {
    return (
        <div className="login">
            < LoginHeader />
            < LoginBody />
            < RegisterCheck />
        </div>
    )
}