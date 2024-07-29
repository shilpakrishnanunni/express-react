import { useState } from 'react';
import Select from 'react-select';
import '../styles/budget.css';
import api from '../utils/api';
import { hooks } from '../hooks/budget.hooks';

export default function Budget() {
  const { data, isLoading, error } = hooks.useBudgetDashboard();
  const updateCategoryStatus = hooks.useSelectCategory();
  const budgetCategories = data?.budgetCategories;
  const budgetAmount = data?.budgetAmount;

  const handleDropdownChange = (categoryId) => {
    if (categoryId && categoryId != '') {
      console.log(`${JSON.stringify(categoryId)} has been selected`);
      updateCategoryStatus.mutate(categoryId);
    }
  };

  const onFormSubmit = async (formData) => {
    try {
      await api.post('budget/add-category', JSON.stringify(formData));
      fetchData();
    } catch (error) {
      console.log('Error submitting form', error);
    }
  };
  return (
    <div className="budget">
      <MonthlyBudget budgetAmount={budgetAmount} />
      <AddCategoryForm onFormSubmit={onFormSubmit} />
      <BudgetCategories
        listCategories={budgetCategories?.listCategories}
        dropdownCategories={budgetCategories?.dropdownCategories}
        handleDropdownChange={handleDropdownChange}
      />
    </div>
  );
}

const MonthlyBudget = ({ budgetAmount }) => {
  // const editBudgetTotal = async (e) => {
  //     setBudgetAmount(e.target.value)
  //     console.log("BUDGET AMOUNT", budgetAmount)
  //     await api.patch("budget/alter-budget", JSON.stringify(budgetAmount));
  // }
  const editBudgetTotal = () => {
    // put a popup or an alert here
  };
  return (
    <div className="monthly-budget-display">
      <p>
        THIS MONTH'S BUDGET: <span>{budgetAmount}</span>
      </p>
      <div>
        <button onClick={editBudgetTotal}>EDIT</button>
      </div>
    </div>
  );
};

const AddCategoryForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({ category: '', recurring: '0' });

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
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category !== '') {
      onFormSubmit(formData);
      setFormData({ category: '', recurring: '0' });
    }
  };

  return (
    <div className="add-category-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="ADD NEW CATEGORY"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="recurring-check"
          id="recurring-check"
          onChange={handleCheckBox}
          checked={formData.recurring === '1'}
        />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

const BudgetCategories = ({
  listCategories = [],
  dropdownCategories = [],
  handleDropdownChange
}) => {
  return (
    <div className="category-display">
      <BudgetTable listCategories={listCategories} />
      <BudgetDropdown
        dropdownCategories={dropdownCategories}
        handleDropdownChange={handleDropdownChange}
      />
    </div>
  );
};

const BudgetTable = ({ listCategories }) => {
  return (
    <div className="budget-category-table">
      <ul>
        {listCategories.map((category) => (
          <BudgetCategoryItem category={category} />
        ))}
      </ul>
    </div>
  );
};

const BudgetCategoryItem = ({ category }) => {
  return (
    <li key={category.id} className="budget-category-list-item">
      <span className='category-name'>{category.name}</span>
      <span className='category-total'>{category.totalAmount}</span>
      <span className='category-amount-left'>{category.amountLeft}</span>
      <span className='category-recurring'><RecurringStatusCheckbox recurring={category.recurring}/></span>
      <span className='category-status' ><RemoveCategoryButton/></span>
    </li>
  );
};

const RecurringStatusCheckbox = ({}) => {
  return (
    <input type="checkbox" name="recurring-status-checkbox" id="recurring-status-checkbox"/>
  )
};

const RemoveCategoryButton = ({}) => {
  return (
    <button className='category-remove-button'>X</button>
  )
};


const BudgetDropdown = ({ dropdownCategories, handleDropdownChange }) => {
  const handleChange = (selectedCategory) => {
    handleDropdownChange(selectedCategory.value);
  };

  return (
    <div className="budget-dropdown">
      <Select
        defaultValue={{ value: '', label: 'SELECT CATEGORY' }}
        name="category-select"
        options={dropdownCategories}
        className="select-category"
        onChange={handleChange}
      />
    </div>
  );
};

