import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { auth } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const [authState, setAuthState] = useState("Google signup")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [price1, setPrice1] = useState(0)
    const [price10, setPrice10] = useState(0)
    const [price25, setPrice25] = useState(0)
    const [vc_platform, setVCPlatform] = useState("")


    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const url = "/api/auth/signup?profile_url=" + auth.currentUser.photoURL + "&email=" + auth.currentUser.email + "&username=" + auth.currentUser.displayName
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (data.tutorCreated == true) {
                setAuthState("Extra_info")
            }
            // User signed in successfully using Google
          } catch (error) {
                console.error("Google login error:", error);
          }    
    }

    function setGoogleMeet() {
        setVCPlatform("Google Meet")
    }

    function setZoom() {
        setVCPlatform("Zoom")
    }

    const submitTutorsInfo = async () => {
        if (phoneNumber != ""  && price1 > 0 && price10 > 0 && price25 > 0 && vc_platform != "") {
            const url = "/api/auth/set_tutor_info?phoneNumber=" + phoneNumber + "&price1=" + price1 + "&price10=" + price10 + "&price25=" + price25 + "&vc_platform=" + vc_platform + "&email=" + auth.currentUser.email
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (data.tutorUpdated  == true) {
                router.push("/")
            }
        }
    }
    return (
        <main className="mx-6">
            <h2>Crea tu cuenta</h2>
            {authState == "Google signup" ? (
                <div className="flex-1 flex flex-col items-center pt-2">
                    <button onClick={handleGoogleSignIn} className="px-4 py-2 bg-white shadow-md flex items-center justify-center rounded-xl py-2 text-[#333533] font-bold">
                        Usar mi cuenta de Google
                    </button>
                </div>) 
            : 
            (
                <div className="flex flex-col">
                    <div className=''>
                        <label className="block mb-2 text-sm font-medium">Número de teléfono</label>
                        <input onChange={(e) => setPhoneNumber(e.target.value)} placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                    </div>   
                    <div>
                        <label className="block mb-2 text-sm font-medium">Plataforma preferida</label>
                        <div className='grid grid-cols-2'>
                            <button onClick={setGoogleMeet} className='w-full h-12 bg-green-200'>Google Meet</button>
                            <button onClick={setZoom} className='w-full h-12 bg-blue-200'>Zoom</button>
                       </div> 
                    </div>  
                    <div>
                        <label className="block mb-2 text-sm font-medium">Selecciona tus precio por clases al comprar (en €)</label>
                        <div className=''>
                            <label className="block mb-2 text-sm font-medium">1 clase</label>
                            <input onChange={(e) => setPrice1(e.target.value)} type="number" placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                        </div>   
                        <div className=''>
                            <label className="block mb-2 text-sm font-medium">10 clase</label>
                            <input onChange={(e) => setPrice10(e.target.value)} type="number" placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                        </div>   
                        <div className=''>
                            <label className="block mb-2 text-sm font-medium">25 clase</label>
                            <input onChange={(e) => setPrice25(e.target.value)} type="number" placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                        </div>   
                        <button onClick={submitTutorsInfo} className='w-full bg-black text-white'>Enviar</button>
                    </div>
                </div>
            )}
        </main>
    )
}
