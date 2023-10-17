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
            <div className="fixed px-4 md:px-6 py-4 md:py-2  flex justify-between items-center bg-white w-screen">
                <div>
                    <button onClick={() => router.push("/")}>
                        <Image alt="Cornelio's logo" height={80} width={80} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/cornelio_logo.png?alt=media&token=9b76d88a-641f-499f-92d2-69b4065e0b59&_gl=1*1moty0o*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5NzUzNTE2Ny4xOTMuMS4xNjk3NTM1MTcyLjU1LjAuMA.." />
                    </button>
                </div>
                <div className='hidden md:flex font-medium text-lg gap-12'>
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