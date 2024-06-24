import HelloWorld, { Transactions, Timer } from "./components/Transactions.jsx";
import { TotalIncomeExpense } from "./components/TotalIncomeExpense.jsx";
import LandingPage from "./components/LandingPage.jsx";

function App() {
  return (
    <>
        {/* < HelloWorld /> */}
        < TotalIncomeExpense />
        {/* < Transactions /> */}
        <Timer />
        {/* < TestForm />
        < TestTable /> */}
        {/* < LandingPage /> */}
    </>
  )
}

export default App
