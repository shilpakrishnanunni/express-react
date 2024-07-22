import { useState } from "react";
import "../styles/budget.css";
import api from "../utils/api";
import { hooks } from "../hooks/budget.hooks";


export default function Budget() {
    let budgetAmount = 500
    const budget = hooks.callBudgetDashboard();
    console.log("budget", budget?.data?.data);


    const onFormSubmit = async (formData) => {
        try {
            await api.post("budget/add-category", JSON.stringify(formData));
            fetchData();
        } catch (error) {
            console.log("Error submitting form", error);
        }
    }
    return (
        <div className="budget">
            < MonthlyBudget budgetAmount={budgetAmount}/>
            < BudgetCategories onFormSubmit={onFormSubmit} />
        </div>
    )
}

const MonthlyBudget = ({budgetAmount}) => {
    const editBudgetTotal = () => {

    }
    return (
        <div className="monthly-budget-display">
        <p>THIS MONTH'S BUDGET: <span>{budgetAmount}</span></p>
        <div><button onClick={editBudgetTotal} >EDIT</button></div>
        </div>
    )
}

const BudgetCategories = ({onFormSubmit}) => {
    const [formData, setFormData] = useState({ category: "", recurring: "0" });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleCheckBox = (e) => {
        const isChecked = e.target.checked;
        setFormData({
            ...formData,
            recurring: isChecked ? '1' : '0'
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.category!=="") {
            onFormSubmit(formData);
            setFormData({ category: "", recurring: "0" })
        }
    }

    return (
        <div className="budget-category">
            <form onSubmit={handleSubmit} >
                <input type="text" name="category" placeholder="ADD NEW CATEGORY" value={formData.category} onChange={handleChange} />
                <input type="checkbox" name="recurring-check" id="recurring-check" onChange={handleCheckBox} checked={formData.recurring==='1'} />
                <button type="submit">ADD</button>
            </form>
        </div>
    )
}

const BudgetDropdown = () => {

    return (
        <div>

        </div>
    )
}

