import { useGetFromServer } from "../../hooks/getFromServer"

export default function LastPostInProfiles({text}) {

    const url = `http://localhost:5150/api/users/user-key?key=createdAt`
    const {status, message, data, loading} =
        useGetFromServer(url, {headers:{"Authorization": `Bearer ${localStorage.getItem("MASproAuth")}`}})

    console.log({data, status, message})

  if (loading) return <div>Loading...</div>
  return (
    <div
        className='w-full text-center text-gray-500 py-4 italic bg-white rounded-lg'
        >{`${text} ${data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''}`}
    </div>
  )
}
