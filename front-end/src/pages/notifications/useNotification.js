
import { useEffect, useState } from "react";
import { useGetMethod } from "../../hooks/useGetMethod"; 

export function useNotifications(limit = 5) {

  const { getData, status_g, data_g, loading_g } = useGetMethod();
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);

    // get data   
    useEffect(() => {
        const fetchData = async () => {
            await getData(`http://localhost:5150/api/notifications/get?limit=${limit}&page=${page}`);
        };
        fetchData();
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
