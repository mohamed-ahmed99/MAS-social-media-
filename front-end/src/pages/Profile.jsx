

export default function Profile() {
  return (
    <div className="bg-gray-100 "> 

        <div className="2xl:container min-h-screen bg-gray-50">
            {/* profile photo &&  background photo*/}
            <div className="relative">
                <div className="h-[200px] bg-gray-200"></div>
                <div className="w-[200px] h-[200px] absolute -bottom-10 left-5 bg-gray-300 rounded-full "></div>
            </div>
        </div>
    </div>
  )
}
