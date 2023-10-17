import { useRouter } from "next/router"
import  { AiFillHome } from "react-icons/ai"
import { BsFillCalendarFill } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs"

export default function BottomNavBar(props) {
    const router = useRouter()
    return (  
        <div className="md:hidden shadow-[0_0px_30px_rgb(0,0,0,0.05)] w-full bg-white py-6 fixed bottom-0">
           <div className="w-full grid grid-cols-3 text-center">
                <div className="flex justify-center items-center">
                    <button onClick={() => router.push("/")}>
                        <AiFillHome color={`${props?.page == "index" ? "#eb4c60" : "#252422"}`} size={30}/>
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={() => router.push("/#students")} className="flex justify-center items-center">
                        <BsFillPersonFill color={`${props?.page == "student" ? "#eb4c60" : "#252422"}`} size={35}/>
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={() => router.push("/calendar")} className="flex justify-center items-center">
                        <BsFillCalendarFill color={`${props?.page == "calendar" ? "#eb4c60" : "#252422"}`} size={24}/>
                    </button>
                </div>
            </div>
        </div>
    )
}