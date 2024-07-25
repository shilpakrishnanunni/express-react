import { useState } from "react";
import Select from "react-select";
import "../styles/budget.css";
import api from "../utils/api";
import { hooks } from "../hooks/budget.hooks";


export default function Budget() {
    const budget = hooks.callBudgetDashboard();
    console.log("budget", budget?.data?.data);
    // const budgetAmount = budget?.data?.data?.response?.budgetAmount ?? "NA";
    const defaultCategory = [ { id: 1, name: 'NA', recurring: '1' } ];
    const budgetCategories = budget?.data?.data?.response?.budgetCategories;

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
            < BudgetDropdown budgetCategories={budgetCategories ?? defaultCategory} />
            <BudgetTable budgetCategories={budgetCategories ?? defaultCategory}/>
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
        <div className="add-category-form">
            <form onSubmit={handleSubmit} >
                <input type="text" name="category" placeholder="ADD NEW CATEGORY" value={formData.category} onChange={handleChange} />
                <input type="checkbox" name="recurring-check" id="recurring-check" onChange={handleCheckBox} checked={formData.recurring==='1'} />
                <button type="submit">ADD</button>
            </form>
        </div>
    )
}

const BudgetTable = ({budgetCategories}) => {

    const selectedCategories = budgetCategories.filter(category => category.status=="1");
    console.log("selectedCategories", selectedCategories)
    return (
        <div>
            <ul>
                {selectedCategories.map((category) => {
                    <li key={category.id}>
                        {category}
                    </li>
                })}
            </ul>
        </div>
    )
}

const BudgetDropdown = ({budgetCategories}) => {
    const dropdownCategories = budgetCategories.map(row => ({ value: row.id, label: row.name }))
    const placeholder = { value: '', label: 'SELECT CATEGORY' };
    const options = [placeholder, ...dropdownCategories];

    const handleChange = (selectedOption) => {
        if (selectedOption && selectedOption.value!="") {
            console.log(`${JSON.stringify(selectedOption)} has been selected`)
        }
    }

    return (
        <div>
            <Select
                defaultValue={placeholder}
                // isMulti
                name="category-select"
                options={options}
                className="select-category"
                onChange={handleChange}
            />
        </div>
    )
}
