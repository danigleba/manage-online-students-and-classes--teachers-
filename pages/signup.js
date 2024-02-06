import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import Image from 'next/image'
import { auth } from "@/utils/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
//import { SiGooglemeet } from "react-icons/si"
import { BiLogoZoom } from "react-icons/bi"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export default function Signup() {
    const router = useRouter()
    const [authState, setAuthState] = useState("Google signup")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [price1, setPrice1] = useState(0)
    const [price10, setPrice10] = useState(0)
    const [price20, setPrice20] = useState(0)
    const [vc_platform, setVCPlatform] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
                .then(
                    setAuthState("FB signup")
                )
        } catch (error) {
            console.error("Google login error:", error);
        }    
    }


    const signup = async () => {
        if (phoneNumber != ""  && price1 > 0 && price10 > 0 && price20 > 0 && vc_platform != "") {
            setErrorMessage("")
            try {
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ phoneNumber: phoneNumber, price1: price1,  price10: price10, price20: price20, vc_platform: vc_platform, user: auth.currentUser})
                })
                const data = await response.json()
                if (data.tutorCreated == true) router.push("/")
            } catch (error) {
                console.log(error)
            }
            
        } else {
            setErrorMessage("Llena todos los campos para continuar.")
        }
    }
    return (
        <>
            <Head>
            <title>Cornelio | Sigup</title>
            <meta name="description" content="Your meta description goes here" />
            <meta name="author" content="Cornelio Tutors" />
            <link rel="icon" href="/icon.png" />
            <link rel="canonical" href="https://tutors.getcornelio.com/"/>
            <meta property="og:title" content="Cornelio Tutors" />
            <meta property="og:description" content="Your meta description goes here" />
            <meta property="og:image" content="https://example.com/og-image.jpg" />
            </Head>
            <main className=" text-[#222222]">  
                <div className="flex justify-center md:grid grid-cols-2 w-full">
                    <div className="hidden md:block">
                        <div className="bg-cover bg-center bg-[url('https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/stock_pictures%2Fauth_bg.webp?alt=media&token=d2fd8cde-eb2e-4f53-99ed-c281af97c971&_gl=1*d4dtyp*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5NzUzMjU4Ny4xOTIuMS4xNjk3NTMzMDk1LjU2LjAuMA..')] w-full h-screen"></div>
                    </div>
                    <div className="rounded-xl w-full flex px-6 md:px-10 flex-col space-y-3 justify-center text-center items-center">
                        {authState == "Google signup" ? (
                            <div className="flex h-screen items-center text-center flex-col space-y-3 justify-center w-full">
                                <Image className="absolute mb-72" alt="alba's logo" width={150} height={150} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/logo.png?alt=media&token=36fa1da0-40a9-4e2e-a6f7-9f3fc5d77510&_gl=1*1x34fcy*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5ODYwMjYxMS4xOTUuMS4xNjk4NjA0OTMyLjQ3LjAuMA.." />
                                <p className="font-bold text-2xl">Crea tu cuenta</p>
                                <div className="border-t border-[#dddddd] w-full flex justify-center"/>
                                <div className="flex justify-center w-full">
                                    <button onClick={handleGoogleSignIn} className={`shadow-[0px_0px_15px_rgb(0,0,0,0.02)] gap-4 w-full md:px-16 py-2 bg-[#f7f7f7] hover:bg-[#dddddd] border border-[#dddddd] flex items-center justify-center rounded-lg text-[#222222] font-bold duration-200`}>
                                        <FcGoogle size={20}/>
                                        <p>Entrar con Google</p>
                                    </button>
                                </div>
                                <p className="pt-2">¿Ya tienes una cuenta? <a href="/login" className="text-blue-400 underline">Inicia sesión</a></p>
                            </div>) 
                            : 
                            (<div className="h-screen w-full items-center justify-center flex flex-col space-y-4 text-md text-left">
                                <div className="w-full">
                                    <p className="pb-2 font-medium">Número de teléfono</p>
                                    <input onChange={(e) => setPhoneNumber(e.target.value)} placeholder="(+34) 424 242 424" className="bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                </div>   
                                <div className="w-full">
                                    <p className="mb-2 font-medium">¿Qué plataforma usas?</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button onClick={() => setVCPlatform("Google meet")} className={`${vc_platform == "Google meet" ? "bg-[#222222] text-white" : "bg-[#f7f7f7] hover:bg-[#dddddd]"} border border-[#dddddd] flex items-center justify-center gap-4 w-full h-12 text-[#222222] rounded-md`}>
                                            {/*<SiGooglemeet color={`${vc_platform == "Google meet" ? "#ffffff" : "#222222" }`}/>*/}
                                            Google Meet</button>
                                        <button onClick={() => setVCPlatform("Zoom")} className={`${vc_platform == "Zoom" ? "bg-[#222222] text-white" : "bg-[#f7f7f7] hover:bg-[#dddddd]"} border border-[#dddddd] flex items-center justify-center gap-4 w-full h-12 bg-[#252422] hover:bg-[#000000] text-[#222222 rounded-md`}>
                                            <BiLogoZoom  size={22} color={`${vc_platform == "Zoom" ? "#ffffff" : "#222222" }`}/>
                                            Zoom</button>
                                </div> 
                                </div>  
                                <div className="text-md font-medium w-full">
                                    <div className="pb-4">
                                        <p className="mb-2">Precio de 1 clase</p>
                                        <input onChange={(e) => setPrice1(e.target.value)} type="number" placeholder="20 €" className="font-normal bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                    </div>   
                                    <div className="pb-4">
                                        <p className="mb-2">Precio de 10 clases</p>
                                        <input onChange={(e) => setPrice10(e.target.value)} type="number" placeholder="180 €" className="font-normal bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                    </div>   
                                    <div className="pb-4">
                                        <p className="mb-2">Precio de 20 clases</p>
                                        <input onChange={(e) => setPrice20(e.target.value)} type="number" placeholder="350 €" className="font-normal bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                    </div>   
                                    <div>
                                        <button onClick={signup} className="mt-4 w-full bg-[#eb4c60] hover:bg-[#d63c4f] py-2 rounded-md text-white">Enviar</button>
                                        <p className="text-center text-sm pt-2 font-light">{errorMessage}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
