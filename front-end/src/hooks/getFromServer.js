import { useEffect } from "react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetFromServer = (endPoint, options = {}) => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async() =>{
            setLoading(true);
            try{
                const response = await fetch(`${API_URL}${endPoint}`, {
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        ...options.headers
                    },
                    credentials:"include"
                });
                const result = await response.json();
        
                if(!response.ok){
                    setStatus("fail");
                    setData(null);
                    setMessage(result.message || "Failed to fetch data.");
                }else{
                    setStatus("success");
                    setData(result.data);
                    setMessage(result.message || "Data fetched successfully.");
                }
        
            }
            catch(error){
                console.error("Error fetching from server:", error);
                setStatus("fail");
                setData(null);
                setMessage(error.message);
            }finally{
                setLoading(false);
            }
        }
        if(endPoint){
            fetchData();
        }else{
            setStatus("idle");
            setData(null);
            setMessage("");
        }

    },[endPoint]);
    return {status, message, data, loading};
}