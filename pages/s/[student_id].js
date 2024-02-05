import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect} from "react"
import Image from "next/image"
import { auth } from "@/utils/firebase"
import { onAuthStateChanged } from "firebase/auth"
import FileUpload from "@/components/FileUpload"
import Header from "@/components/Header"
import AddStudentButton from "@/components/AddStudentsButtons"
import ClassCard from "@/components/ClassCard"
import BottomNavBar from "@/components/BottomNavBar"
import { IoDocumentText } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs"

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export default function Student_id() {
  const router = useRouter()  
  const { student_id } = router.query
  const [student, setStudent] = useState({})
  const [user, setUser] = useState({})
  const [classes, setClasses] = useState([])
  const [studentFiles, setStudentFiles] = useState([])

  const getStudent = async () => {
    try {
      const response = await fetch(`/api/students/get_student?student_id=${student_id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }), 
      })
      const data = await response.json()
      setStudent(data.data)
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const getStudentClasses = async () => {
    try {
      const response = await fetch(`/api/students/get_student_classes?student_email=${student?.email}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }), 
      })
      const data = await response.json()
      setClasses(data.data)
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const getStudentFiles = async () => {
    try {
      const response = await fetch(`/api/students/get_student_files?student_email=${student?.email}&tutor_email=${user?.email}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }), 
      })
      const data = await response.json()
      setStudentFiles(data.data)
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push("/login")
      }
    })    
  }, [])

  useEffect(() => {
    if (student_id) getStudent()
  }, [student_id])

  useEffect(() => {
    getStudentClasses()
    if (user) getStudentFiles()
  }, [student, user])
  return (
    <>
      <Head>
          <title>Alba | {student?.username}</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Cornelio Tutors" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://tutors.getcornelio.com/"/>
          <meta property="og:title" content="Cornelio Tutors" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main className="mb-12 md:mb-24">
        <Header user={user} />
        <div className="mx-6 md:mx-10 flex items-center gap-6">
          <Image className="rounded-full" alt="Student's profile picture" height={70} width={70} src={student?.profile_url} />
          <div className="space-y-1">
            <p className="font-bold text-xl">{student?.username}</p>
            {student && user?.email && student?.paid_classes && (
              <p className="w-max bg-[#f7f7f7] border-[#dddddd] border px-4 py-1 text-center rounded-md font-semibold text-[#252422] text-sm">Le quedan {student?.paid_classes[user.email] || 0} clases</p>
            )}   
          </div>
        </div>
        <div className="flex justify-between md:justify-start items-center gap-4 mt-10 mx-6 md:mx-10 mb-4 ">
          <div>
            <h2>Documentos</h2> 
          </div>
          <FileUpload student_email={student?.email} tutor_email={user?.email} />
        </div> 
        {studentFiles.length > 0 ? (
          <div className="text-[#222222] mx-6 md:mx-10 flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-center font-medium">
            {studentFiles.map((item, index) => (
              <a target="_blank" href={item.downloadUrl}  key={item.id || index}>
                <div className="px-8 w-full bg-white shadow-[0px_0px_15px_rgb(0,0,0,0.02)] border border-[#dddddd] duration-200 rounded-xl p-4 flex justify-between items-center">
                  <div className="truncate flex items-center gap-4">
                    <div className="w-max">
                      <IoDocumentText size={20} color="#222222"/>
                    </div>
                    <p className="truncate">{item.name}</p>
                  </div>
                </div>
              </a>
            ))} 
          </div>
        ) : (
          <div>
            <div className='mx-6 md:mx-10 flex-col justify-center'>
              <p className='text-center font-light text-md md:text-lg'>Aún no tienes ningún documento para {student?.username}. <br/> Sube docs. para que {student?.username} los pueda ver.</p>
              <div className='pt-6 flex justify-center'>
                <FileUpload student_email={student?.email} tutor_email={user?.email} />
              </div>
            </div>
          </div>
        )}
        <div className="pt-10"></div>
        <h2 className="mb-4 mx-6 md:mx-10">Próximas clases con {student?.username}</h2>   
        {classes.length > 0 ? (
          <div className="mx-6 md:mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {classes.map((i) => (
                <a key={i.id}>
                  <ClassCard item={i}/>
                </a>
            ))}
          </div>
        ) : (
          <div>
            <div className='mx-6 md:mx-10 flex-col justify-center'>
              <p className='text-center font-light text-md md:text-lg'>No tienes ninguna clase programada con {student?.username}. <br/>Añade alumnos para que reserven clases contigo.</p>
              <div className='pt-6 flex justify-center'>
                <AddStudentButton />
              </div>
            </div>
          </div>
        )}
        <BottomNavBar page={"student"} />
      </main>
    </>
  )
}
