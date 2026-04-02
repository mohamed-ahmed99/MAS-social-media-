import { useEffect } from "react";
import { useState } from "react";


export const useGetMethod = () => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(null);




        const getData = async (url) =>{

            if (!url) throw new Error("No URL to Get Data")

            // clear previous data
            setData(null);
            setMessage("");
            setStatus("idle");
            setLoading(true);
            setAction(null);

            // fetch data
            try{
                const response = await fetch(url, {
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    credentials:"include",
                });
                const result = await response.json();
        
                if(!response.ok){
                    setStatus("fail");
                    setData(null);
                    setAction(result.action);
                    setMessage(result.message || "Failed to fetch data.");
                }else{
                    setStatus("success");
                    setAction(result.action);
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
        

    return {getData, status_g:status, message_g:message, data_g:data, loading_g:loading, action_g:action};
}