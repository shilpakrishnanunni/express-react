import { NavLink } from 'react-router-dom';

import '../styles/leftMenu.css';

export default function LeftMenu() {
  return (
    <div className="left-menu">
      <ul>
        <LeftMenuEntry text="HOME" link="/" />
        <LeftMenuEntry text="MANAGE BUDGET" link="/budget" />
        <LeftMenuEntry text="TRANSACTION HISTORY" link="/transactions" />
        <LeftMenuEntry text="PORTFOLIO" link="/portfolio" />
      </ul>
    </div>
  );
}

const LeftMenuEntry = ({ text, link }) => {
  return (
    <li className="left-menu-item">
      <NavLink to={link}>{text}</NavLink>
      {/* <a href={link} >{text}</a> */}
    </li>
  );
};
