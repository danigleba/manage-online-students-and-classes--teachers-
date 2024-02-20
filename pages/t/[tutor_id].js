import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect} from "react"
import { auth } from "@/utils/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import BottomNavBar from "@/components/BottomNavBar"
import TutorPage from "@/components/TutorPage"
import { Inter } from "next/font/google"
import { TiArrowUnsorted } from "react-icons/ti"

const inter = Inter({ subsets: ['latin'] })

export default function Student_id() {
  const router = useRouter()  
  const { tutor_id } = router.query
  const [tutor, setTutor] = useState({})
  const [tutorEmail, setTutorEmail] = useState()
  const [availableClasses, setAvailableClasses] = useState(0)
  const [user, setUser] = useState()
  const [userData, setUserData] = useState({})

  const getTutor = async () => {
    try {
      const response = await fetch(`/api/tutors/get_tutor?tutor_id=${tutor_id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setTutor(data.data)
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const getUser = async () => {
    try {
        const response = await fetch(`/api/auth/signupStudent`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: Cookies.get("userCookie") }), 
        })
        const data = await response.json()
        setUserData(data.data)
      } 
      catch (error) {
        console.error("Error fetching comments:", error.message)
      } 
  }

  const findAvailableClasses = async () => {
    for (let i = 0; i < userData?.tutors?.length; i++) {
        if (userData?.tutors[i]?.uid == tutor_id) {
          setAvailableClasses(userData?.tutors[i].classCredit)
          return
        }
    }
    return
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        //Open login popup and reload page after login/signup
      }
    })    
  }, [])

  useEffect(() => {
    if (user) getUser()
  }, [user])

  useEffect(() => {
    if (userData && tutor_id) findAvailableClasses()
  }, [userData, tutor_id])

  useEffect(() => {
    if (tutor) setTutorEmail(tutor?.email)
  }, [tutor])

  useEffect(() => {
    if (tutor_id) getTutor()
  }, [tutor_id])
  return (
    <>
      <Head>
          <title>Alba | Reserva con {tutor?.username}</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Cornelio Tutors" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://tutors.getcornelio.com/"/>
          <meta property="og:title" content="Cornelio Tutors" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main className="mb-12 md:mb-24">
        <TutorPage tutor={tutor} availableClasses={availableClasses} user={user} userData={userData} />
      </main>
    </>
  )
}
