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

    const [formData, setFormData] = useState({ inputValue: "", hiddenValue: "test" });

    // function handleChange(e) {
    //     setFormData({
    //         inputValue: e.target.value
    //     });
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log("formData", formData)
            await api.post("home", JSON.stringify(formData) )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="" >
            <form onSubmit={handleSubmit}>
                <label>
                <input type="text" name="inputValue" value={FormData.inputValue} onChange={(e) => {setFormData({...formData, inputValue: e.target.value})}} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}