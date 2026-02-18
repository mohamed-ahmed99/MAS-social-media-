import {motion} from "framer-motion"
import { useNotifications } from "./useNotification";
import CircularImage from "../../components/CircularImage";
import LoadMoreBtn from "../../components/btns/LoadMore";
import {Link} from 'react-router-dom'
import NotificationLoading from "../../components/loadings/NotificationLoading";

// my hooks

export default function Dropdown() {

  const targetNotifications = 10
  const {notifications, fetchedCount, loading, status, loadMore } = useNotifications(targetNotifications)
  console.log({notifications, fetchedCount, loading, status })
  

  return (
    <motion.div 
        initial={{top:0, opacity:0}}
        animate={{top:80, opacity:1}}
        transition={{duration:0.25}}

        className="absolute top-0 right-4 z-[999] w-96 bg-white shadow-2xl rounded-xl border border-gray-100 p-0 overflow-hidden">
      
      {/* header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Notifications</h2>
        <p> <span className="bg-blue-600 py-1 px-3 text-white rounded-full">+99</span> unread</p>
      </div>

      {/* notifications */}
      <div className="flex flex-col gap-2 p-3 max-h-[350px] overflow-y-auto">
        {notifications.map((n, i) => {

          return(

            <motion.div 
              key={i}
              whileHover={{scale:1.01}}
              className={`
                ${!n?.isRead ? "bg-blue-50 border-l-4 border-blue-500" : "bg-white"} 
                flex justify-between items-start p-3 rounded-lg 
                transition-all duration-200 hover:bg-gray-50
              `}
            >
              <Link 
                className="flex items-start gap-3"
              >
                {/* img */}
                <div className="shrink-0">
                  <CircularImage 
                    size={40}
                    firstName={n?.from?.personalInfo?.firstName} 
                    lastName={n?.from?.personalInfo?.lastName} 
                  />
                </div>

                {/* content */}
                <div>
                    <p className={`text-sm ${!n?.isRead && "font-medium"}`}>
                      {n?.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(n?.createdAt).toLocaleString()}
                    </p>
                </div>
              </Link>
              
              {/* isRead? */}
              {!n?.isRead &&
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"/>
              }

            </motion.div>
          )

        })}
      </div>

        {/* loading */}
          {loading &&
            <div className="space-y-1 px-4">
              {Array(4).fill(0).map((_, index) => <NotificationLoading key={index}/>)}
            </div>
          }



      {/* footer */}
      {fetchedCount == targetNotifications &&
      <div className="border-t border-gray-100 p-3">
          <LoadMoreBtn loadMore={loadMore} loading={loading} text="Load More"/>
      </div>
      }

    </motion.div>
  );
}
