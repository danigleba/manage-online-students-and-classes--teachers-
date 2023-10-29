import Head from "next/head"
import { useRouter } from "next/router"
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
        router.push("/")
      }
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
            <p className="font-bold text-2xl text-[#222222]">Iniciar sesión</p>
            <div className="border-t w-full flex justify-center border-[#dddddd]"></div>
            <div className="flex justify-center w-full">
              <button onClick={handleGoogleSignIn} className="shadow-[0px_0px_15px_rgb(0,0,0,0.02)] duration-200 gap-4 w-full md:px-16 py-2 bg-[#f7f7f7] hover:bg-[#dddddd] border border-[#dddddd] flex items-center text-[#222222] justify-center rounded-lg font-bold">
                <FcGoogle size={20}/>
                <p>Entrar con Google</p>
              </button>
            </div>
            <p className="pt-2 text-[#222222]">¿Aún no tienes una cuenta? <a href="/signup" className="text-blue-400 underline">Regístrate</a></p>
          </div>
        </div>
      </main>
    </>
  )
}
