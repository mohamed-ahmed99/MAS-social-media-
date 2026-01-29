import { useEffect } from "react";
import { useState } from "react";


export const useGetFromServer = (url, options = {}) => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async() =>{
            setLoading(true);
            try{
                const response = await fetch(url, {
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
        if(url){
            fetchData();
        }else{
            setStatus("idle");
            setData(null);
            setMessage("");
        }

    },[url]);
    return {status, message, data, loading};
}