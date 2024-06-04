import "../styles/landingPage.css";
import LoginForm from "./LoginForm.jsx";

export default function LandingPage() {


    return (
        <div className="container blue-grey lighten-5">
            <div className="landing-page col s6">
                <div className="landing-left col s3 grey lighten-5">
                    <img src="/images/landing_page.jpeg" alt="IMAGE" className="landing-image responsive-img" />
                </div>
                <div className="landing-right col s3 grey lighten-5" >
                    <LoginForm />

                </div>

            </div>
        </div>
        
    )
}