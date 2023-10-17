import { useState, useEffect } from "react"
import {auth} from "@/utils/firebase"
import {onAuthStateChanged} from "firebase/auth"
import Header from "@/components/Header"
import Calendar from "@/components/Calendar"
import Footer from "@/components/Footer"
import BottomNavBar from "@/components/BottomNavBar"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function CalendarPage() {
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } 
    })    
  }, [])
  return (
    <main>
      <Header user={user} />
      <Calendar user={user}/>
      <div className='py-24'></div>
      <BottomNavBar page={"calendar"}/>
      <Footer />
    </main>
  )
}