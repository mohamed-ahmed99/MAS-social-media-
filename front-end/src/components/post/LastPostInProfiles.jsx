import { useGetFromServer } from "../../hooks/getFromServer"
import PostLoading from "./PostLoading"

export default function LastPostInProfiles({text}) {

    // http://localhost:5150/api/users/user-key?key=createdAt
    // https://masproback.vercel.app/api/users/user-key?key=createdAt
    const url = `https://masproback.vercel.app/api/users/user-key?key=createdAt`
    const {status, message, data, loading} =
        useGetFromServer(url, {headers:{"Authorization": `Bearer ${localStorage.getItem("MASproAuth")}`}})


  if (loading) return <PostLoading />
  return (
    <div
        
        className='w-full text-center text-gray-500 py-4 italic bg-white rounded-lg'
    >
        {`${text} ${data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''}`}
    </div>
  )
}
