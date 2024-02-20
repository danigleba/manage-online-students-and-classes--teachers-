import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Cookies from "js-cookie"
import AddStudentButton from "./AddStudentsButtons"

export default function Headers(props) {
    const router = useRouter()
    const userCookie = Cookies.get("userCookie")
    const [userData, setUserData] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    //The prices can be an array
    const [email, setEmail] = useState()
    const [price1, setPrice1] = useState()
    const [price10, setPrice10] = useState()
    const [price20, setPrice20] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const [tutorFormIsOpen, setTutorFormIsOpen] = useState(false)
    
    const handleAuth = async () => {
        const params = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = params.get("access_token") 
        const userData = await fetchUserData(accessToken ? accessToken : Cookies.get("accesCookie"))
        setUserData(userData)
        if (!userCookie) {
            if (accessToken) {
                Cookies.set("accesCookie", accessToken, { expires: 30 })
                Cookies.set("userCookie", userData.id, { expires: 30 })
                checkUserInFirestore(userData)
            } else router.push("/signup")
        } else checkUserInFirestore(userData)
    }
    
    const fetchUserData = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const userData = await response.json()
            setUserData(userData)
            return userData
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }

    const checkUserInFirestore = async (user) => {
        const url = "/api/auth/check_tutor_info?uid=" + user?.id
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        if (data.userExists == false) {
            setTutorFormIsOpen(true)
        } else getUserFromFirebase(user)
    }

    const uploadUserToFirebase = async () => {
        if (price1 && price10 && price20 && phoneNumber && email) {
            setErrorMessage("") 
            const response = await fetch("/api/auth/set_tutor_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: userData, price1: price1, price10: price10, price20: price20, phoneNumber: phoneNumber, email: email })
            })
            const data = await response.json() 
            if (data.newTutorAdded == true) router.reload()
        } else setErrorMessage("Llena todos los campos para continuar.") 
    }
    
    const getUserFromFirebase = async (user) => {
        const response = await fetch("/api/firebase/getTutor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user })
        })
        const data = await response.json() 
        console.log(data)
        setUserData(data.user)
    }

    useEffect(() => {
        handleAuth()
    }, [Cookies])
    return (
        <main className="pb-28 md:pb-32 w-full">
            <div className="fixed top-0 px-6 md:px-10 py-3 flex justify-between items-center bg-white w-screen border-b boder-[#dddddd]">
                <div>
                    <button onClick={() => router.push("/")}>
                        <Image alt="Cornelio's logo" height={100} width={100} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/logo.png?alt=media&token=36fa1da0-40a9-4e2e-a6f7-9f3fc5d77510&_gl=1*1x34fcy*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5ODYwMjYxMS4xOTUuMS4xNjk4NjA0OTMyLjQ3LjAuMA.." />
                    </button>
                </div>
                <div className='hidden md:flex font-semibold text-lg gap-12 text-[#222222]'>
                    <a href="/">Clases</a>
                    <a href="/#students">Alumnos</a>
                    <a href="/calendar">Calendario</a>
                </div>
                <div className="flex items-center gap-4 text-[#222222]">
                    <div className="hidden md:block">
                    <AddStudentButton user={props?.user} />
                    </div>
                    <div>
                        <p className="hidden md:flex font-semibold text-lg">{userData?.name}</p>
                    </div>
                    <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={userData?.picture}/>
                </div>
            </div>

            {/*In the future this modal will redirecto to the stripe connected account setUp*/}
            <div className={`fixed inset-0 flex items-center justify-center z-50 ${tutorFormIsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
                <div className=" modal-overlay absolute inset-0 bg-gray-800 opacity-50" />
                <div className="mx-6 md:mx-10 modal-container bg-white w-full md:w-1/3 rounded-2xl z-50 overflow-y-auto">
                <div className="p-8 text-center">
                <div className="h-full w-full items-center justify-center flex flex-col space-y-6 text-md text-left">
                                <div className="flex items-center justify-center gap-6">
                                    <h2>Completa tu perfil</h2>
                                    <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={userData?.picture}/>
                                </div>
                                <div className="w-full">
                                    <p className="pb-1 font-light text-sm">Email</p>
                                    <input onChange={(e) => setEmail(e.target.value)} placeholder="nombre@gmail.com" className="bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                </div>   
                                 <div className="w-full">
                                    <p className="pb-1 font-light text-sm">Número de teléfono</p>
                                    <input onChange={(e) => setPhoneNumber(e.target.value)} placeholder="(+34) 424 242 424" className="bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                </div>   
                                <div className="text-md font-medium w-full">
                                    <div className="pb-6">
                                        <p className="pb-1 font-light text-sm">Precio de 1 clase</p>
                                        <input onChange={(e) => setPrice1(e.target.value)} type="number" placeholder="20 €" className="font-normal bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                    </div>   
                                    <div className="pb-6">
                                        <p className="pb-1 font-light text-sm">Precio de 10 clases</p>
                                        <input onChange={(e) => setPrice10(e.target.value)} type="number" placeholder="180 €" className="font-normal bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                    </div>   
                                    <div className="pb-6">
                                        <p className="pb-1 font-light text-sm">Precio de 20 clases</p>
                                        <input onChange={(e) => setPrice20(e.target.value)} type="number" placeholder="350 €" className="font-normal bg-[#f7f7f7] border border-[#dddddd] text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                    </div>   
                                    <div>
                                        <button onClick={uploadUserToFirebase} className="mt-4 w-full bg-[#eb4c60] hover:bg-[#d63c4f] py-2 rounded-md text-white">Enviar</button>
                                        <p className="text-center text-sm pt-2 font-light">{errorMessage}</p>
                                    </div>
                                </div>
                            </div>
                </div>
                </div>
            </div>
        </main>
    )
}