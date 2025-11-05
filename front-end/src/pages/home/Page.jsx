import Home from "./Home";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";


export default function Page() {
  return (
    <div className="bg-gray-200 ">
    <div className="min-h-screen flex justify-between gap-5 2xl:max-w-[1380px] 2xl:m-auto  relative ">
        <LeftSide/>
        <Home/>
        <RightSide/>
    </div>
    </div>
  )
}
