import { useEffect } from "react";
import { useState } from "react";


export const useGetFromServer = (url, options = {}) => {

    const [data, setData] = useState(null);
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async() =>{
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
                    setData(result.posts);
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
        fetchData();

    },[url]);
    return {status, message, data, loading};
}