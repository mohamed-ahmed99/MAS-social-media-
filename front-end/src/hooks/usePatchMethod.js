import { useState } from "react";


export const usePathMethod = () => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    
        const editData = async (url, body) =>{
            const token = localStorage.getItem("MASproAuth")
            setLoading(true);
            try{
                const response = await fetch(url, {
                    method:"PATCH",
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`Bearer ${token}`
                    },
                    credentials:"include",
                    body: body ? JSON.stringify(body) : undefined
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


    return {editData, status_e:status, message_e:message, data_e:data, loading_e:loading};
}

