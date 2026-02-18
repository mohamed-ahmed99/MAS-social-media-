
import { useEffect, useRef, useState } from "react";
import { useGetMethod } from "../../hooks/useGetMethod"; 

export function useNotifications(limit = 5) {

  const { getData, status_g, data_g, loading_g } = useGetMethod();
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const fetchDataRef = useRef(true)

    // get data   
    useEffect(() => {
        const fetchData = async () => {
          // https://masproback.vercel.app
          // http://localhost:5150/api/notifications/get?limit=${limit}&page=${page}`
            await getData(`https://masproback.vercel.app/api/notifications/get?limit=${limit}&page=${page}`);
            fetchDataRef.current = false
        };
        if(fetchDataRef?.current){
          fetchData();
        }
    }, [page]);

    // merge data
    useEffect(() => {
        if (!data_g?.notifications) return;

        setNotifications(prev =>
        page === 1 ? data_g.notifications : [...prev, ...data_g.notifications]
        );
    }, [data_g]);




  return {
    notifications, 
    fetchedCount:data_g?.notificationLength || 0,
    loading: loading_g,
    status: status_g,
    loadMore: () => setPage(prev => prev + 1),
  };
}
