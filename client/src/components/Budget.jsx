import { useState } from "react";
import "../styles/budget.css";
import api from "../utils/api";
import { hooks } from "../hooks/budget.hooks";


export default function Budget() {
    const budget = hooks.callBudgetDashboard();
    console.log("budget", budget?.data?.data);
    // const budgetAmount = budget?.data?.data?.response?.budgetAmount ?? "NA";
    const defaultCategory = [ { id: 1, name: 'NA', recurring: '1' } ];

    const [ budgetAmount, setBudgetAmount ] = useState(budget?.data?.data?.response?.budgetAmount ?? "NA");


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
            < MonthlyBudget budgetAmount={budgetAmount} setBudgetAmount={setBudgetAmount} />
            < AddCategoryForm onFormSubmit={onFormSubmit} />
            < BudgetDropdown budgetCategories={budget?.data?.data?.response?.budgetCategories ?? defaultCategory} />
        </div>
    )
}

const MonthlyBudget = ({budgetAmount, setBudgetAmount}) => {
    // const editBudgetTotal = async (e) => {
    //     setBudgetAmount(e.target.value)
    //     console.log("BUDGET AMOUNT", budgetAmount)
    //     await api.patch("budget/alter-budget", JSON.stringify(budgetAmount));
    // }
    const editBudgetTotal = () => {
        // put a popup or an alert here
    }
    return (
        <div className="monthly-budget-display">
        <p>THIS MONTH'S BUDGET: <span>{budgetAmount}</span></p>
        <div><button onClick={editBudgetTotal} >EDIT</button></div>
        </div>
    )
}

const AddCategoryForm = ({onFormSubmit}) => {
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

const BudgetTable = () => {

    return (
        <div>

        </div>
    )
}

const BudgetDropdown = ({budgetCategories}) => {

    return (
        <select value="ADD CATEGORY">
            {budgetCategories.map((category, index) => (
                <option name={category.name} value={category.name} id={category.id} key={category.id}>{category.name}</option>
            ))}
        </select>
    )
}

