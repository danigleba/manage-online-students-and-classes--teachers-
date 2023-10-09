import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Calendar(props) {
    const router = useRouter()
    const [classes, setClasses] = useState([])
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "sebtiembre", "octubre", "noviembre", "diciembre"]
    const [type, setType] = useState("Month")
    const [isOpen, setIsOpen] = useState(false)
    const [deleteId, setDeleteID] = useState("")

  useEffect(() => {
    let url
    if (type == "Week") {
        url = "/api/classes/get_classes_week?tutor_email=" + props?.user?.email
    } else if (type == "Month") {
        url = "/api/classes/get_classes_month?tutor_email=" + props?.user?.email
    } else {
        url = "/api/classes/get_classes?tutor_email=" + props?.user?.email
    }
    if (url) {
        fetch(url)
        .then(response => response.json())
        .then(data => setClasses(data.data))
    }
  }, [props?.user, type])

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
    <main className="pt-8 overflow-hidden">
      <h2 className='px-8'>Clases programadas</h2>
      <div className='flex gap-4 px-8'>
            <button onClick={() => setType("All")} className='bg-gray-200 px-4 py-2 rounded-full'>Todas</button>
            <button onClick={() => setType("Week")}  className='bg-gray-200 px-4 py-2 rounded-full'>Esta semana</button>
            <button onClick={() => setType("Month")}  className='bg-gray-200 px-4 py-2 rounded-full'>Este mes</button>
      </div>
        {type}
      <div className="flex w-screen items-center">
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {classes.map((item) => (
            <a key={item.id}>
              <div className='w-full bg-white shadow-[0_0px_50px_rgb(0,0,0,0.08)] rounded-xl p-6'>
                <div className="flex justify-between pb-8">
                  <div className="flex gap-4">
                    <Image className='rounded-full' alt="Student's profile picture" height={50} width={50} src={item?.profile_url} />
                    <div>
                      <p className="font-bold">{item?.day.substr(-2)} de {months[parseInt(item?.day.slice(5, 7)) - 1]}, {item?.start_time} h</p>
                      <p className="font-light">Con {item.tutor_name}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <button className='bg-black font-medium text-white py-2 rounded-md hover:bg-[#f4f4f4] hover:text-black duration-200'>Empezar clase</button>
                  <button onClick={() => setDeleteID(item.id)}  className='border-2 border-red-400 font-medium text-red-400 py-1.5 rounded-md hover:bg-red-400 hover:text-white duration-200'>Cancelar clase</button>
                </div>
              </div>
            </a>
          ))}
        </div>
        </div>
         {/*Delete class confirmation modal*/}
         <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className="modal-overlay absolute inset-0 bg-gray-800 opacity-50" />
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Modal Title</p>
                {deleteId}
                <button
                  onClick={() => setDeleteID("")}
                  className="modal-close px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L9 7.586l3.293-3.293a1 1 0 111.414 1.414L10.414 9l3.293 3.293a1 1 0 11-1.414 1.414L9 10.414l-3.293 3.293a1 1 0 01-1.414-1.414L7.586 9 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <button onClick={cancellClass} className='p-4 bg-red-200'>Cancelar clase</button>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}
