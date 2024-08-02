import '../styles/navBar.css';
// import logout from "../assets/images/logout.svg"
import { hooks } from '../hooks/login.hooks';

const NavBar = ({username,onLogout}) => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <AppName />
        <Greeting username={username}/>
        <Profile />
        <Logout onLogout={onLogout}/>
      </ul>
    </div>
  );
};

const AppName = () => {
  return (
    <li className="navbar-component logo outline">
      <a href="/dashboard">BUDGET TRACKER</a>
    </li>
  );
};

const Greeting = ({username}) => {
  return (
    <li className="navbar-component greeting outline">
      <span>Welcome back, {username}.</span>
    </li>
  );
};

const Profile = () => {
  return (
    <li className="navbar-component profile outline">
      <a href="">PROFILE</a>
    </li>
  );
};

const Logout = ({onLogout}) => {
  const mutation = hooks.useLogout();
  const userId = localStorage.getItem('userId');
  const handleLogout = () => {
    mutation.mutate(userId, {
      onSuccess:(data) => {
        console.log("logout successful", data)
      },
      onError: (error) => {
        console.log("logout failed", error);
      }
    })
    onLogout();
  }


  return (
    <li className="navbar-component logout outline">
      {/* <i src={logout}></i> */}
      <a href='#' onClick={handleLogout}>LOGOUT</a>
    </li>
  );
};

export default NavBar;
