import NavBar from "./NavBar.jsx";
import LeftMenu from "./LeftMenu.jsx";
import MainContent from "./MainContent.jsx";


export default function MainLayout() {
    // TODO homepage api call here.
    // TODO rerender totalincomeexpense when new transaction is added 
    return (
        <div className="main-div">
            < NavBar />
            < LeftMenu />
            < MainContent />
            
        </div>
    )

}


