import Head from "next/head"
import { useState, useEffect } from "react"
import {auth} from "@/utils/firebase"
import {onAuthStateChanged} from "firebase/auth"
import Header from "@/components/Header"
import Calendar from "@/components/Calendar"
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
    <>
      <Head>
          <title>Cornelio | Calendario</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Cornelio Tutors" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://tutors.getcornelio.com/"/>
          <meta property="og:title" content="Cornelio Tutors" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main>
        <Header user={user} />
        <Calendar user={user}/>
        <BottomNavBar page={"calendar"}/>
      </main>
    </>
  )
}