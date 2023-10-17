import { useEffect, useState } from 'react'
import ClassCard from './ClassCard'
import AddStudentButton from './AddStudentsButtons'
import { BiSolidLeftArrow } from 'react-icons/bi'
import { BiSolidRightArrow } from 'react-icons/bi'

export default function NextClasses(props) {
  const [classes, setClasses] = useState([])
  const [slide, setSlide] = useState(0)
  const [nSlide, setNSlide] = useState(3)

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
  return (
    <main className="mx-4 md:mx-6">
    <h2 className="mb-6">Clases del día</h2>
    <div className="flex items-center w-full">
      {classes?.length > 0 ? (
        <div className='w-screen'>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {visibleClasses.map((item) => (
              <a key={item.id}>
                <ClassCard item={item} />
              </a>
            ))}
          </div>
          {classes.length > nSlide ? (
            <div className="pt-6 flex gap-4 justify-center items-center">
              <button onClick={handlePrevSlide} disabled={slide === 0} className={`${slide === 0 ? "bg-gray-100" : "bg-white shadow-[0_0px_30px_rgb(0,0,0,0.1)]" } flex items-center rounded-full p-3 rounded-md`}>
                <BiSolidLeftArrow color="#252422" size={20} />
              </button>
              <div className="flex justify-center">
                {classes.map((item, index) => {
                  const className = `h-2.5 w-2.5 mx-1 rounded-full ${index >= slide && index < slide + nSlide ? 'bg-[#eb4c60]' : 'bg-gray-200'}`;
                  return (
                    <div key={item.id} className={className}></div>
                  );
                })}
              </div>
              <div>
                <button onClick={handleNextSlide} disabled={slide === classes.length - nSlide} className={`${slide === classes.length - nSlide ? "bg-gray-100" : "bg-white shadow-[0_0px_30px_rgb(0,0,0,0.1)]" } flex items-center rounded-full p-3 rounded-md `}>
                  <BiSolidRightArrow color="#252422" size={20} />
                </button>
              </div>
            </div>
          ) : (<></>)}
        </div>
      ) : (
        <div className='w-full flex-col justify-center'>
          <p className='text-center font-light text-md md:text-lg'>No tienes ninguna clase más hoy. <br/>Añade alumnos para que reserven clases contigo.</p>
          <div className='pt-6 flex justify-center'>
            <AddStudentButton />
          </div>
        </div>
      )}
    </div>
  </main>
  )
}
