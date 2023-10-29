import { useRouter } from "next/router"
import  { AiFillHome } from "react-icons/ai"
import { BsFillCalendarFill } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs"

export default function BottomNavBar(props) {
    const router = useRouter()
    return (  
        <div className="md:hidden w-screen border-t border-t-[#dddddd] bg-white py-4 fixed bottom-0">
           <div className="w-full px-6 grid grid-cols-3 text-center">
                <div className="flex justify-center items-center">
                    <button className="h-full flex flex-col items-center justify-end" onClick={() => router.push("/")}>
                        <AiFillHome color={`${props?.page == "index" ? "#eb4c60" : "#dddddd"}`} size={25}/>
                        <p className="pt-0.5 text-center font-light text-xs">Inicio</p>
                    </button>
                </div>
                <div className="flex justify-center items-end text-center">
                    <button className="h-full flex flex-col items-center justify-end" onClick={() => router.push("/#students")}>
                        <BsFillPersonFill color={`${props?.page == "student" ? "#eb4c60" : "#dddddd"}`} size={30}/>
                        <p className="text-center font-light text-xs">Alumnos</p>
                    </button>
                </div>
                <div className="flex justify-center">
                    <button className="h-full flex flex-col items-center justify-end" onClick={() => router.push("/calendar")}>
                        <BsFillCalendarFill color={`${props?.page == "calendar" ? "#eb4c60" : "#dddddd"}`} size={20}/>
                        <p className="pt-1 text-center font-light text-xs">Calendario</p>
                    </button>
                </div>
            </div>
        </div>
    )
}