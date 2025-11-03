import Home from "./Home";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";


export default function Page() {
  return (
    <div className="bg-gray-200 ">
    <div className="min-h-screen flex justify-between gap-10 2xl:container  ">
        <LeftSide/>
        <Home/>
        <RightSide/>
    </div>
    </div>
  )
}
