import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect} from "react"
import { auth } from "@/utils/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BottomNavBar from "@/components/BottomNavBar"
import NextClasses from "@/components/NextClasses"
import Students from "@/components/Students"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  const router = useRouter()  
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user)
      } else {
        router.push("/login")
      }
    })    
  }, [])
  return (
    <>
      <Head>
        <title>Alba | Clases</title>
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
        <NextClasses user={user}/>
        <div className="w-full h-20"></div>
        <Students user={user} />
        <BottomNavBar page={"index"} />
      </main>
    </>
  )
}
