import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import { auth } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import FileUpload from '@/components/FileUpload'
import { GrDocumentText } from 'react-icons/gr'
import { LiaLongArrowAltRightSolid } from 'react-icons/lia'
import { TiDelete } from 'react-icons/ti'
import Footer from '@/components/Footer'

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
    <main className='w-screen'>
      <Header user={user} />
      <div className='mx-6 flex items-center gap-6'>
        <Image className='rounded-full' alt="Student's profile picture" height={75} width={75} src={student?.profile_url} />
        <div className="space-y-2">
          <p className='font-bold text-2xl'>{student?.username}</p>
          {student && user?.email && student?.paid_classes && (
            <p className=' w-max bg-[#252422] px-4 py-1 text-center rounded-md font-medium text-white text-sm'>Saldo: {student?.paid_classes[user.email] || 0} clases</p>
            )}   
        </div>
      </div>
      <div className='mx-8 flex gap-4 items-center mt-12 mb-6'>
        <h2>Documentos</h2> 
        <FileUpload student_email={student?.email} tutor_email={user?.email} />
      </div> 
          <div className='mx-6 flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 text-center font-bold'>
            {studentFiles.map((item) => (
              <a target="_blank" href={item.downloadUrl} key={item.id}>
                <div className='px-8 w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.15)] hover:shadow-[0_3px_10px_rgb(0,0,0,0.25)] duration-200 rounded-xl p-6 flex justify-between items-center'>
                  <div className='truncate flex items-center gap-2'>
                    <GrDocumentText />
                    <p className='truncate'>{item.name}</p>
                  </div>
                  <div>
                    <LiaLongArrowAltRightSolid strokeWidth={0.5} size={28}/>
                  </div>
                </div>
              </a>
            ))}   
          </div>
        <h2 className='mb-6 mx-6 pt-12'>Próximas clases con {student?.username}</h2>   
        <div className="mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((item) => (
            <a key={item.id}>
              <div className='w-full bg-white duration-200 shadow-[0_3px_10px_rgb(0,0,0,0.15)] rounded-xl p-6'>
                <div className="flex justify-between pb-6">
                  <div className="flex gap-4">
                    <Image className='rounded-full' alt="Student's profile picture" height={50} width={50} src={item?.student_profile} />
                    <div>
                      <p className="font-bold">{item?.day.substr(-2)} de {months[parseInt(item?.day.slice(5, 7)) - 1]}, {item?.start_time} h</p>
                      <p className="font-light">Con {item.tutor_name}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-4'>
                  <div>
                    <button className='w-full bg-[#6156f6] font-semibold text-white py-2 rounded-md hover:bg-[#5047c9] duration-200'>Empezar clase</button>
                  </div>
                  <div className='flex justify-center'>
                    <button onClick={() => setDeleteID(item.id)} className='hover:bg-red-400 duration-200 bg-[#252422] font-normal text-red-400 py-1.5 items-center  gap-1.5 rounded-md w-max px-4 text-white duration-200 text-sm flex justify-center'>
                      <TiDelete stroke-width="0" color="white" size={20} />
                      <p>Cancelar clase</p>
                    </button>
                  </div>
                </div>
              </div>
            </a>
          ))}
          </div>
          
          <Footer />
    </main>
  )
}
