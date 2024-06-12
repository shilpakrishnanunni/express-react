import { useState, useEffect, useLayoutEffect } from "react";
import api from "../utils/api";
import { useQuery, QueryClient, useQueryClient, useMutation } from "@tanstack/react-query";
import "../styles/transactions.css";

export default function HelloWorld() {
    const [response, setResponse] = useState("");

    const handleClick = async() => {
        try {
            const result = await api.get("hello-world");
            console.log("result",result);
            setResponse(result.data.response);
    
        } catch (error) {
            console.log("error fetching data", error);
        }
    }

    return (
        <div>
            <button onClick={handleClick} >Click Here</button>
            <div>{response}</div>
        </div>
    )
}

export function Timer() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
          setCount((count) => count + 1);
        }, 1000);
      });

    return (
        <h1>Rendered {count} times.</h1>
    )

}

export const Transactions = () => {
    const [txn, setTxn] = useState([]);

    useLayoutEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log("here")
            const response = await api.get('home/transaction-history');
            console.log("data",response.data.data)
            setTxn(response.data.data);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    }

    const onFormSubmit = async (formData) => {
        try {
            await api.post("home/add-transaction", JSON.stringify(formData));
            fetchData();
        } catch (error) {
            console.log("Error submitting form", error);
        }
    }

    return (
        <div>
            < TransactionForm onFormSubmit={onFormSubmit} />
            < TransactionTable transactions={txn} />
        </div>
    )
}

const TransactionForm = ({onFormSubmit}) => {
    const [formData, setFormData] = useState({description:"", amount: "", type:"debit"})

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.description && formData.amount) {
            onFormSubmit(formData);
            setFormData({description:"", amount: "", type:"debit"})
        }
    }


    return (
        <form onSubmit={handleSubmit} className="txn-form">
            <h4>Add Transaction</h4>
            <div className="row" >
                <div className="input-field">
                    <input id="description" type="text" className="validate" name="description" placeholder="description" value={formData.description} onChange={handleChange} />
                    <label htmlFor="description">Description</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field">
                    <input id="amount" type="number" className="validate" name="amount" placeholder="amount" value={formData.amount} onChange={handleChange} />
                    <label htmlFor="amount">Amount</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field">
                    <label htmlFor="radio-credit">
                    <input id='radio-credit' type="radio" name="type" value="credit" className="with-gap" checked={formData.type==='credit'} onChange={handleChange} />
                        Credit</label>
                </div>
                
            </div>
            <div className="row">
                <div className="input-field">
                    <label htmlFor="radio-debit">
                    <input id='radio-debit' type="radio" name="type" value="debit" className="with-gap" checked={formData.type==='debit'} onChange={handleChange} />
                        Debit</label>
                </div>
            </div>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}

const TransactionTable = ({transactions}) => {
    console.log("transactions", transactions)
    return (
        <div>
            <h1>Transaction History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Transaction Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.length > 0 ? (
                        transactions?.map((txn, index) => 
                        (<tr key={index} className="table-row" >
                            <td>{txn.description}</td>
                            <td>{txn.amount}</td>
                            <td>{txn.createdAt}</td>
                            <td>{txn.type}</td>
                        </tr>)
                        )
                    ) : (
                        <tr colSpan="4" >
                            No transactions.
                        </tr>
                    )}
                    {}
                </tbody>
            </table>
        </div>
    )
}
