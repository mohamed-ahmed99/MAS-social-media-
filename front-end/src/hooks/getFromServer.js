import { useState } from "react";
import { data } from "react-router-dom";


export const getFromServer = async (url, options = {}) => {
    const [loading, setLoading] = useState(true);

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
            return {status:"fail", data: null, loading, message: result.message || "Failed to fetch data from server."};
        }

        return {status:"success", data: result, loading, message: result.message || "Data fetched successfully."};

    }
    catch(error){
        console.error("Error fetching from server:", error);
        return {status:"fail", message: error.message, data: null, loading};
    }finally{
        setLoading(false);
    }
}