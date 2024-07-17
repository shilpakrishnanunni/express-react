import "../styles/leftMenu.css";


export default function LeftMenu() {

    return (
        <div className="left-menu" >
            <ul>
                < LeftMenuEntry text="MANAGE BUDGET" link="/budget" />
                < LeftMenuEntry text="TRANSACTION HISTORY" link="/transactions" />
                < LeftMenuEntry text="PORTFOLIO" link="/portfolio" />
            </ul>
        </div>
    )
}

const LeftMenuEntry = ({text, link}) => {

    return (
        <li className="left-menu-item">
            <a href={link} >{text}</a>
        </li>
    )
}