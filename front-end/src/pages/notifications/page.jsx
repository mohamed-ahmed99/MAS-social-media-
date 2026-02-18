
import { useNotifications } from "./useNotification";


export default function Notification() {
  const {notifications, fetchedCount, loading, status, loadMore } = useNotifications(20)
  console.log({notifications, fetchedCount, loading, status })
  
  return (
    <div>page</div>
  )
    
}
