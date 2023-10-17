import { useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { auth } from "@/utils/firebase"
import { onAuthStateChanged } from "firebase/auth"
import AddStudentButton from "./AddStudentsButtons"

export default function Headers(props) {
    const router = useRouter()

    const checkUserRegistration = async () => {
        const url = "/api/auth/check_tutor_info?email=" + auth.currentUser.email
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        
        if (data.tutorRegistered == false) {
           router.push("/signup")
        }
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.push("/login")
          } else {
            checkUserRegistration()
          }
        })    
    }, [])
    return (
        <main className="pb-24 w-full">
            <div className="fixed px-6 py-2  flex justify-between items-center bg-white w-screen">
                <div>
                    <a href="/" className='font-bold text-[#eb4c60] text-xl'>cornelio</a>
                </div>
                <div className='hidden md:flex text-lg gap-12'>
                    <a href="/">Clases</a>
                    <a href="/#students">Alumnos</a>
                    <a href="/calendar">Calendario</a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                    <AddStudentButton user={props?.user} />
                    </div>
                    <div>
                        <p className="hidden md:flex font-semibold text-lg">{props?.user?.displayName}</p>
                    </div>
                    <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={props?.user?.photoURL}/>
                </div>
            </div>
        </main>
    )
}