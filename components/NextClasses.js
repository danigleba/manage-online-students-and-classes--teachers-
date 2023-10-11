import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiSolidLeftArrow } from 'react-icons/bi'
import { BiSolidRightArrow } from 'react-icons/bi'
import { TiDelete } from 'react-icons/ti'

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
    <main className="pt-6 mx-6">
      <h2 className='mb-6'>Clases del día</h2>
      <div className="flex items-center w-full">
        <div className={`w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full`}>
          {visibleClasses.map((item) => (
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
        </div>
        {classes.length > nSlide ? (
          <div className='pt-6 flex gap-4 justify-center items-center'>
          <button onClick={handlePrevSlide} disabled={slide === 0} className={`${slide === 0 ? "bg-gray-100" : "bg-white shadow-[0_0px_30px_rgb(0,0,0,0.1)]" } flex items-center rounded-full p-3 rounded-md`}>
            <BiSolidLeftArrow color="#252422" size={20}/>
          </button>
          <div className="flex justify-center">
              {classes.map((item, index) => (
                  <div
                      key={item.id}
                      className={`h-2.5 w-2.5 mx-1 rounded-full ${index >= slide && index < slide + nSlide ? 'bg-[#eb4c60]' : 'bg-gray-200'}`}
                  ></div>
              ))}
          </div>
          <button onClick={handleNextSlide} disabled={slide === classes.length - nSlide} className={`${slide === classes.length - nSlide ? "bg-gray-100" : "bg-white shadow-[0_0px_30px_rgb(0,0,0,0.1)]" } flex items-center rounded-full p-3 rounded-md `}>
            <BiSolidRightArrow color="#252422" size={20}/>
          </button>
        </div>
        ) : (<></>)}
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
    </main>
  )
}
