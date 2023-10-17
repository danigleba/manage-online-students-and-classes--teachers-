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
    <main>
      <Header user={user} />
      <NextClasses user={user}/>
      <div className='my-12'></div>
      <Students user={user} />
      <div className='my-24'></div>
      <BottomNavBar page={"index"} />
      <Footer />
    </main>
  )
}
