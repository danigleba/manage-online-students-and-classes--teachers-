import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import { auth } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import FileUpload from '@/components/FileUpload'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()  
  const { student_id } = router.query
  const [student, setStudent] = useState({})
  const [user, setUser] = useState({})
  const [classes, setClasses] = useState([])
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "sebtiembre", "octubre", "noviembre", "diciembre"]
  const [studentFiles, setStudentFiles] = useState([])

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

  useEffect(() => {
    fetch("/api/students/get_student?student_id=" + student_id)
        .then(response => response.json())
        .then(data => setStudent(data.data))
  }, [user])

  useEffect(() => {
    fetch("/api/students/get_student_classes?student_email=" + student?.email)
        .then(response => response.json())
        .then(data => setClasses(data.data))

      fetch("/api/students/get_student_files?student_email=" + student?.email + "&tutor_email=" + user?.email)
        .then(response => response.json())
        .then(data => setStudentFiles(data.data))
  }, [student])
  return (
    <main className='mx-6'>
      <Header user={user} />
      <div className='flex items-center gap-6'>
        <Image className='rounded-full' alt="Student's profile picture" height={75} width={75} src={student?.profile_url} />
        <p className='font-bold text-3xl'>{student?.username}</p>
      </div>
      {student && user?.email && student?.paid_classes && (
            <p>Saldo: {student?.paid_classes[user?.email] || 0} clases</p>
        )}   
        <p className='font-bold text-xl pt-12'>Próximas classes con {student?.username}</p>   
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {classes.map((item) => (
            <a key={item.id}>
              <div className='w-full bg-white shadow-[0_0px_50px_rgb(0,0,0,0.08)] rounded-xl p-6'>
                <div className="flex justify-between pb-8">
                  <div className="flex gap-4">
                    <Image className='rounded-full' alt="Student's profile picture" height={50} width={50} src={item?.profile_url} />
                    <div>
                      <p className="font-bold">{item?.day.substr(-2)} de {months[parseInt(item?.day.slice(5, 7)) - 1]}, {item?.start_time} h</p>
                      <p className="font-light">Con {item?.tutor_name}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <button className='bg-black font-medium text-white py-2 rounded-md hover:bg-[#f4f4f4] hover:text-black duration-200'>Empezar clase</button>
                  <button className='border-2 border-red-400 font-medium text-red-400 py-1.5 rounded-md hover:bg-red-400 hover:text-white duration-200'>Cancelar clase</button>
                </div>
              </div>
            </a>
          ))}   
          </div>
          <p className='font-bold text-xl pt-12'>Documentos</p>   
          <FileUpload student_email={student?.email} tutor_email={user?.email} />
          {studentFiles.map((item) => (
            <a target="_blank" href={item.downloadUrl} key={item.id}>
              <div className='w-full bg-white shadow-[0_0px_50px_rgb(0,0,0,0.08)] rounded-xl p-6'>
                {item.name}
              </div>
            </a>
          ))}   
    </main>
  )
}
