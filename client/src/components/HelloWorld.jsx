import { useState } from "react";
import axios from "axios";

export default function HelloWorld() {
    const [response, setResponse] = useState("");

    const handleClick = async() => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}hello-world`);
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