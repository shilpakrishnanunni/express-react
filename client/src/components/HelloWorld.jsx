import { useState } from "react";
import api from "../utils/api";

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
        <div className="" >
            <form onSubmit={handleSubmit}>
                <input type="text" name="description" placeholder="description" value={formData.description} onChange={handleChange} />
                <input type="number" name="amount" placeholder="amount" value={formData.amount} onChange={handleChange} />
                <input type="number" name="category" placeholder="category" value={formData.category} onChange={handleChange} />
                <label htmlFor="transaction_type">Transaction type:</label>
                <select name="type" id="transaction_type" className="browser-default" value={formData.type} onChange={handleChange}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}