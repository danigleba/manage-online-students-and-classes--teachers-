import Image from 'next/image'
import { useEffect } from 'react'
import { auth } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { HiOutlinePlus } from 'react-icons/hi'
import { useState } from 'react'
import AddStudentButton from './AddStudentsButtons'

export default function Headers(props) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

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
        <main className="mx-6 my-4 h-max flex justify-between items-center">
            <div>
                <a href="/" className='font-bold text-[#eb4c60] text-xl'>cornelio</a>
            </div>
            <div className='hidden md:flex text-lg font-medium gap-12'>
                <a href="/">Clases</a>
                <a href="/#students">Alumnos</a>
                <a href="/calendar">Calendario</a>
            </div>
            <div className="flex items-center gap-4">
                <div>
                  <AddStudentButton user={props?.user} />
                </div>
                <div>
                    <p className="hidden md:flex font-semibold text-lg">{props?.user?.displayName}</p>
                </div>
                <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={props?.user?.photoURL}/>
            </div>
        </main>
    )
}