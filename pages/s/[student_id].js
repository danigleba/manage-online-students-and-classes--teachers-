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
import { BsArrowRight } from 'react-icons/bs'

import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()  
  const [isOpen, setIsOpen] = useState(false)
  const [deleteId, setDeleteID] = useState("")
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

  useEffect(() => {
    if (deleteId == "") {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [deleteId])

  const cancellClass = async () => {
    const url = "/api/classes/delete_class?class_id=" + deleteId 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        if (data.classDeleted) {
          router.reload()
        }
  }
  return (
    <main className='w-screen'>
      <Header user={user} />
      <div className='mx-6 flex items-center gap-6'>
        <Image className='rounded-full' alt="Student's profile picture" height={70} width={70} src={student?.profile_url} />
        <div className="space-y-1">
          <p className='font-bold text-xl'>{student?.username}</p>
          {student && user?.email && student?.paid_classes && (
            <p className=' w-max bg-[#f4f4f4] px-4 py-1 text-center rounded-md font-semibold text-[#252422] text-sm'>Le quedan {student?.paid_classes[user.email] || 0} clases</p>
            )}   
        </div>
      </div>
      <div className='mx-8 flex gap-4 items-center mt-12 mb-6'>
        <h2>Documentos</h2> 
        <FileUpload student_email={student?.email} tutor_email={user?.email} />
      </div> 
          <div className='mx-6 flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 text-center font-medium'>
            {studentFiles.map((item) => (
              <a target="_blank" href={item.downloadUrl} key={item.id}>
                <div className='px-8 w-full bg-white hover:shadow-[0_0px_30px_rgb(0,0,0,0.14)] shadow-[0_0px_30px_rgb(0,0,0,0.1)] duration-200 rounded-xl p-4 flex justify-between items-center'>
                  <div className='truncate flex items-center gap-4'>
                    <GrDocumentText />
                    <p className='truncate'>{item.name}</p>
                  </div>
                  <div>
                    <BsArrowRight size={22}/>
                  </div>
                </div>
              </a>
            ))}   
          </div>
        <h2 className='mb-6 mx-6 pt-24'>Próximas clases con {student?.username}</h2>   
        <div className="mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((item) => (
            <a key={item.id}>
              <div className='w-full bg-white duration-200 shadow-[0_0px_30px_rgb(0,0,0,0.1)] rounded-xl p-6'>
                <div className="flex justify-between pb-6">
                  <div className="flex gap-4">
                    <Image className='rounded-full' alt="Student's profile picture" height={50} width={50} src={item?.student_profile} />
                    <div>
                      <p className="font-semibold">{item?.day.substr(-2)} de {months[parseInt(item?.day.slice(5, 7)) - 1]}, {item?.start_time} h</p>
                      <p className="font-light">Con {item.tutor_name}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-4'>
                  <div>
                    <button className='w-full bg-[#252422] font-medium text-white py-2 rounded-md hover:bg-[#000000] duration-200'>Empezar clase</button>
                  </div>
                  <div className='flex justify-center'>
                    <button onClick={() => setDeleteID(item.id)} className='hover:bg-gray-200 duration-200 bg-[#f4f4f4] font-medium py-1.5 items-center  gap-1.5 rounded-md w-max px-4 text-[#252422] duration-200 text-sm flex justify-center'>
                      <TiDelete stroke-width="0" color="#252422" size={20} />
                      <p>Cancelar clase</p>
                    </button>
                  </div>
                </div>
              </div>
            </a>
          ))}
          </div>
          <div className='py-24'></div>
          {/*Delete class confirmation modal*/}
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className="modal-overlay absolute inset-0 bg-gray-800 opacity-50" />
          <div className="modal-container bg-white w-4/10  rounded-xl shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-6 text-left px-6">
              <p className="text-xl text-center font-semibold">¿Seguro que quieres cancelar la clase?</p> 
              <div className='flex gap-4 pt-6'>
                <div className="modal-body w-1/2">
                  <button onClick={cancellClass} className='w-full py-2 bg-[#252422] hover:bg-[#000000] rounded-md font-semibold text-white'>Si, cancelar clase</button>
                </div>
                <div className="modal-body w-1/2">
                  <button onClick={() => setDeleteID("")} className='w-full py-2 bg-[#f4f4f4] hover:bg-gray-200 font-semibold text-[#252422] duration-200 rounded-md'>No, cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
          <Footer />
    </main>
  )
}
