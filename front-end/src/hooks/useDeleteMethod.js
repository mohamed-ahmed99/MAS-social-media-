import { useState } from "react";


export const useDeleteMethod = () => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    
        const deleteData = async (url, options) =>{
            const token = localStorage.getItem("MASproAuth")
            setLoading(true);
            try{
                const response = await fetch(url, {
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`Bearer ${token}`
                    },
                    credentials:"include",
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


    return {deleteData, status_d:status, message_d:message, data_d:data, loading_d:loading};
}

