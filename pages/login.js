import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import { auth } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()  
  const googleProvider = new GoogleAuthProvider()

  const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        router.push("/")
      } catch (error) {
            console.error("Google login error:", error);
      }    
}
  return (
    <main className='mx-6'>
      <div className="flex-1 flex flex-col items-center pt-2">
            <button onClick={handleGoogleSignIn} className="px-4 py-2 bg-white shadow-md flex items-center justify-center rounded-xl py-2 text-[#333533] font-bold">
                Usar mi cuenta de Google
            </button>
        </div>
    </main>
  )
}
