import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import NextClasses from '@/components/NextClasses'
import Students from '@/components/Students'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import { auth } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
    <main className='mx-6'>
      <Header user={user} />
      <NextClasses user={user}/>
      <Students user={user} />
    </main>
  )
}
