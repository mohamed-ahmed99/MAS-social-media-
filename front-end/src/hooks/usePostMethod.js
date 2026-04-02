import { useEffect } from "react";
import { useState } from "react";


export const usePostMethod = () => {

    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(null);


    const postData = async (url, options = {}, body) => {

        if (!body) return null
        setLoading(true);
        setMessage("");
        setStatus("idle");
        setAction(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers
                },
                credentials: "include",
                body: JSON.stringify(body)
            });
            const result = await response.json();

            if (!response.ok) {
                if(result.status === "validation") {
                    setStatus("validation")
                    setData(result.data)
                    setAction(result.action || null)
                    setMessage(result.message)
                    return
                }
                setStatus("fail");
                setData(null);
                setAction(result.action || null)
                setMessage(result.message || "Failed to fetch data.");
            } else {
                setStatus("success");
                setAction(result.action || null)
                setData(result.data);
                setMessage(result.message || "Data fetched successfully.");
            }

        }
        catch (error) {
            console.error("Error fetching from server:", error);
            setStatus("fail");
            setData(null);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }


    return { 
        postData, 
        status_p: status, 
        message_p: message, 
        data_p: data, 
        action_p: action, 
        loading_p: loading 
    };
}