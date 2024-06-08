import { useState, useEffect } from "react";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

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


// export function Transactions() {
//     TestForm()
//     TestTable()
// }

export function TestForm() {

    const [formData, setFormData] = useState({
        description: "", 
        amount: 0, 
        category: 1, 
        type: "credit" 
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log("formData", formData)
            await api.post("home/add-transaction", JSON.stringify(formData) )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="col s12">
            <div className="row" >
                <div className="input-field col s12">
                    <input id="description" type="text" className="validate" name="description" placeholder="description" value={formData.description} onChange={handleChange} />
                    <label htmlFor="description">Description</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input id="amount" type="number" className="validate" name="amount" placeholder="amount" value={formData.amount} onChange={handleChange} />
                    <label htmlFor="amount">Amount</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input id="category" type="number" className="validate" name="category" placeholder="category" value={formData.category} onChange={handleChange} />
                    <label htmlFor="category">Category</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                {/* <label htmlFor="transaction_type">Transaction type:</label> */}
                    <select name="type" id="transaction_type" className="browser-default" value={formData.type} onChange={handleChange}>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>

                </div>
            </div>
            <button className="button waves-effect waves-light" type="submit">Submit</button>
        </form>
    )
}

export function TestTable() {

    async function fetchData() {
        const response = await api.get('home/transaction-history');
        return response.data.data;
    }

    const { isError, isLoading, error, data } = useQuery({
        queryKey: ['transactionHistory'],
        queryFn: fetchData
    })
    console.log("response.data",data)

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

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
                    {data.map((txn, index) => (
                        <tr key={index}>
                            <td>{txn.description}</td>
                            <td>{txn.amount}</td>
                            <td>{txn.createdAt}</td>
                            <td>{txn.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}