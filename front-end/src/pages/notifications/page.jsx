import { motion } from "framer-motion"
import { useNotifications } from "./useNotification";
import CircularImage from "../../components/CircularImage";
import LoadMoreBtn from "../../components/btns/LoadMore";
import { Link } from "react-router-dom";
import NotificationLoading from "../../components/loadings/NotificationLoading";

export default function Notification() {

  const { notifications, fetchedCount, loading, status, loadMore } = useNotifications(20)

  const unreadCount = notifications.filter(n => !n?.isRead).length;

  return (
    <div className="block min-h-screen bg-white">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        
        <h1 className="text-xl font-semibold">
          Notifications
        </h1>

        {unreadCount > 0 && (
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            {unreadCount}
          </span>
        )}

      </div>

      {/* LIST */}
      <div className="flex flex-col">

        {notifications.map((n, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.98 }}
            className={`
              ${!n?.isRead ? "bg-blue-50 border-l-4 border-blue-500" : ""}
              px-4 py-4 border-b border-gray-100
              active:bg-gray-100 transition
            `}
          >

            <Link className="flex items-start gap-4">

              <CircularImage
                size={45}
                firstName={n?.from?.personalInfo?.firstName}
                lastName={n?.from?.personalInfo?.lastName}
              />

              <div className="flex-1">
                <p className={`text-sm ${!n?.isRead && "font-semibold"}`}>
                  {n?.title}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(n?.createdAt).toLocaleString()}
                </p>
              </div>

            </Link>

          </motion.div>
        ))}

        {loading && 
          <div className="space-y-1 px-4">
            {Array(4).fill(0).map((_, index) => <NotificationLoading key={index}/>)}
          </div>
        }

      </div>

      {/* LOAD MORE */}
      {fetchedCount == 20 && (
        <div className="p-4">
          <LoadMoreBtn
            loadMore={loadMore}
            loading={loading}
            text="Load More"
          />
        </div>
      )}

    </div>
  )
}
