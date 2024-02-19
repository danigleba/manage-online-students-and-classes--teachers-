import Head from "next/head"
import { useRouter } from "next/router"
import Image from 'next/image'
import { auth } from "@/utils/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const router = useRouter()  
  const googleProvider = new GoogleAuthProvider()

  const handleGoogleSignIn = async () => {
    try {
        googleProvider.addScope("calendar")
        const result = await signInWithPopup(auth, googleProvider)
        router.push("/")
    } catch (error) {
        console.error("Google login error:", error);
    }    
  }
  return (
    <>
      <Head>
          <title>Cornelio | Login</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Cornelio Tutors" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://tutors.getcornelio.com/"/>
          <meta property="og:title" content="Cornelio Tutors" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main>   
        <div className="flex justify-center md:grid grid-cols-2 w-full">
        <div className="hidden md:block">
            <div className="bg-cover bg-center bg-[url('https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/stock_pictures%2Fauth_bg.webp?alt=media&token=d2fd8cde-eb2e-4f53-99ed-c281af97c971&_gl=1*d4dtyp*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5NzUzMjU4Ny4xOTIuMS4xNjk3NTMzMDk1LjU2LjAuMA..')] w-full h-screen"></div>
          </div>
          <div className="h-screen w-full flex px-6 md:px-10 flex-col space-y-3 justify-center text-center items-center">
            <Image className="absolute mb-72" alt="alba's logo" width={150} height={150} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/logo.png?alt=media&token=36fa1da0-40a9-4e2e-a6f7-9f3fc5d77510&_gl=1*1x34fcy*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5ODYwMjYxMS4xOTUuMS4xNjk4NjA0OTMyLjQ3LjAuMA.." />
            <p className="font-bold text-2xl text-[#222222]">Iniciar sesión</p>
            <div className="border-t w-full flex justify-center border-[#dddddd]"></div>
            <div className="flex justify-center w-full">
              <button onClick={handleGoogleSignIn} className="shadow-[0px_0px_15px_rgb(0,0,0,0.02)] duration-200 gap-4 w-full md:px-16 py-2 bg-[#f7f7f7] hover:bg-[#dddddd] border border-[#dddddd] flex items-center text-[#222222] justify-center rounded-lg font-bold">
                <FcGoogle size={20}/>
                <p>Entrar con Google</p>
              </button>
            </div>
            <p className="pt-2">¿No tienes una cuante? <a href="/signup" className="text-blue-400 underline">Crea tu cuenta</a></p>
          </div>
        </div>
      </main>
    </>
  )
}
