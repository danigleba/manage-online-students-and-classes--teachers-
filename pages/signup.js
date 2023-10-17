import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { auth } from "@/utils/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Footer from "@/components/Footer"
import { BsGoogle } from "react-icons/bs"
import { SiGooglemeet } from "react-icons/si"
import { BiLogoZoom } from "react-icons/bi"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export default function Signup() {
    const router = useRouter()
    const [authState, setAuthState] = useState("")
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
        } catch (error) {
            console.error("Google login error:", error);
        }    
    }

    const sumitTutorsInfo = async () => {
        if (phoneNumber != ""  && price1 > 0 && price10 > 0 && price20 > 0 && vc_platform != "") {
            setErrorMessage("")
            const url = "/api/auth/set_tutor_info?phoneNumber=" + phoneNumber + "&price1=" + price1 + "&price10=" + price10 + "&price20=" + price20 + "&vc_platform=" + vc_platform + "&email=" + auth.currentUser.email
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
        } else {
            setErrorMessage("Llena todos los campos para continuar.")
        }
    }
    return (
        <main className="bg-[#f4f4f4] text-[#252422]">  
            <div className="flex justify-center grid grid-cols-2 w-full">
                <div>
                    <Image alt="Women working remotely" width={1000} height={300} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/stock_pictures%2Fauth_bg.webp?alt=media&token=d2fd8cde-eb2e-4f53-99ed-c281af97c971&_gl=1*e83cqw*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5NzA0MTYyMi4xODQuMS4xNjk3MDQyODEwLjQ3LjAuMA.." />
                </div>
                 <div className="rounded-xl w-full flex p-12 flex-col space-y-3 justify-center text-center items-center">
                    {authState == "Google signup" ? (
                        <div className="flex flex-col space-y-3 justify-center w-full">
                            <p className="font-bold text-2xl">Crea tu cuenta</p>
                            <div className="border-t-2 w-full flex justify-center border-[#252422]"/>
                            <div className="flex justify-center w-full">
                                <button onClick={handleGoogleSignIn} className={` ${googleBtColour}gap-4 w-full md:px-16 py-2 bg-[#eb4c60] hover:bg-[#d63c4f] flex items-center justify-center rounded-lg text-white font-bold`}>
                                    <BsGoogle color={"white"} />
                                    <p>Entrar con Google</p>
                                </button>
                            </div>
                            <p className="pt-2">¿Ya tienes una cuenta? <a href="/login" className="text-blue-400 underline">Inicia sesión</a></p>
                        </div>) 
                        : 
                        (<div className="flex flex-col space-y-4 w-full px-12 text-md font-medium text-left">
                            <div>
                                <p className="pb-2">Número de teléfono</p>
                                <input onChange={(e) => setPhoneNumber(e.target.value)} placeholder="(+34) 424 242 424" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            </div>   
                            <div>
                                <p className="mb-2">¿Qué plataforma usas?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => setVCPlatform("Google meet")} className={`${vc_platform == "Google meet" ? "bg-[#eb4c60] hover:bg-[#d63c4f]" : "bg-[#252422] hover:bg-[#000000]"} flex items-center justify-center gap-4 w-full h-12 font-semibold text-white rounded-md`}>
                                        <SiGooglemeet />
                                        Google Meet</button>
                                    <button onClick={() => setVCPlatform("Zoom")} className={`${vc_platform == "Zoom" ? "bg-[#eb4c60] hover:bg-[#d63c4f]" : "bg-[#252422] hover:bg-[#000000]"} flex items-center justify-center gap-4 w-full h-12 bg-[#252422] hover:bg-[#000000] text-white font-semibold rounded-md`}>
                                        <BiLogoZoom  size={22}/>
                                        Zoom</button>
                            </div> 
                            </div>  
                            <div className="text-md font-medium">
                                <p className="text-center font-semibold mt-4">¿Cuánto cobras por tus clases? (€)</p>
                                <div className="pb-4">
                                    <p className="mb-2">1 clase</p>
                                    <input onChange={(e) => setPrice1(e.target.value)} type="number" placeholder="20" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                </div>   
                                <div className="pb-4">
                                    <p className="mb-2">10 clases</p>
                                    <input onChange={(e) => setPrice10(e.target.value)} type="number" placeholder="180" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                </div>   
                                <div className="pb-4">
                                    <p className="mb-2">20 clases</p>
                                    <input onChange={(e) => setPrice20(e.target.value)} type="number" placeholder="350" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                </div>   
                                <div>
                                    <button onClick={sumitTutorsInfo} className="mt-4 w-full bg-[#eb4c60] hover:bg-[#d63c4f] py-2 rounded-md text-white">Enviar</button>
                                    <p className="text-center text-sm pt-2 font-light">{errorMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    )
}
