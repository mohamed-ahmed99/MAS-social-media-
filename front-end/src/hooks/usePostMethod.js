import { useEffect } from "react";
import { useState } from "react";


export const usePostMethod = () => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


        const postData = async (url, options = {}, body) =>{
            if (!body) return null
            setLoading(true);
            try{
                const response = await fetch(url, {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        ...options.headers
                    },
                    credentials:"include",
                    body:JSON.stringify(body)
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
        

    return {postData, status_p:status, message_p:message, data_p:data, loading_p:loading};
}