import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'
import { FiArrowLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'

export default function NextClasses(props) {
    const router = useRouter()
    const [classes, setClasses] = useState([])
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "sebtiembre", "octubre", "noviembre", "diciembre"]
    const [slide, setSlide] = useState(0)
    const [nSlide, setNSlide] = useState(3)
    const [isOpen, setIsOpen] = useState(false)
    const [deleteId, setDeleteID] = useState("")

    useEffect(() => {
        //Function to make the carrusel responsive
        const updateNSlide = () => {
          const screenWidth = window.innerWidth
          if (screenWidth <= 767) { 
            setNSlide(1)
          } else if (screenWidth <= 1023) { 
            setNSlide(2)
          } else if (screenWidth > 1023) { 
            setNSlide(3)
          }
        }
    
        updateNSlide();
        window.addEventListener("resize", updateNSlide)
    
        return () => {
          window.removeEventListener("resize", updateNSlide)
        }
      }, [])

  useEffect(() => {
    fetch("/api/classes/get_classes_today?tutor_email=" + props?.user?.email)
      .then(response => response.json())
      .then(data => setClasses(data.data))
  }, [props?.user]);

  const handleNextSlide = () => {
    setSlide(prevSlide => Math.min(prevSlide + 1, classes.length - nSlide))
  }

  const handlePrevSlide = () => {
    setSlide(prevSlide => Math.max(prevSlide - 1, 0))
  }

  const visibleClasses = classes.slice(slide, slide + nSlide)

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
      <h2 className='px-8'>Tus clases de hoy</h2>
      <div className="flex w-screen items-center">
        <div className={`px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full transform transition-transform duration-300 ease-in-out -translate-x-${slide * (100 / nSlide)}%`}>
          {visibleClasses.map((item) => (
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
                  <button onClick={() => setDeleteID(item.id)} className='border-2 border-red-400 font-medium text-red-400 py-1.5 rounded-md hover:bg-red-400 hover:text-white duration-200'>Cancelar clase</button>
                </div>
              </div>
            </a>
          ))}
        </div>
        </div>
        <div className='flex justify-center items-center'>
            <div className="flex hover:scale-105 duration-200 rounded-full p-2">
            <button onClick={handlePrevSlide} disabled={slide === 0}><FiArrowLeft /></button>
            </div>
            <div className="flex justify-center mt-4">
                {classes.map((item, index) => (
                    <div
                        key={item.id}
                        className={`h-3 w-3 mx-1 rounded-full ${index >= slide && index < slide + nSlide ? 'bg-black' : 'bg-gray-400'}`}
                    ></div>
                ))}
            </div>
            <div className="flex hover:scale-105 duration-200 rounded-full p-2">
            <button onClick={handleNextSlide} disabled={slide === classes.length - nSlide}><FiArrowRight /></button>
            </div>
        </div>
        {/*Delete class confirmation modal*/}
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className="modal-overlay absolute inset-0 bg-gray-800 opacity-50" />
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Modal Title</p>
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
