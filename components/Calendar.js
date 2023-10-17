import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import AddStudentButton from "./AddStudentsButtons"
import ClassCard from "./ClassCard"

export default function Calendar(props) {
  const [classes, setClasses] = useState([])
  const [type, setType] = useState("Week")

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
  return (
    <main>
      <h2 className='mx-4 md:mx-6'>Clases programadas</h2>
      <div className='flex gap-4 mx-4 md:mx-6 text-sm font-semibold mt-4 mb-6'>
            <button onClick={() => setType("Week")}  className={`${type == "Week" ? "bg-[#252422] text-white" : "bg-[#f4f4f4]"} hover:bg-[#252422] hover:text-white duration-200 px-5 py-2 rounded-full font-medium`}>Esta semana</button>
            <button onClick={() => setType("Month")}  className={`${type == "Month" ? "bg-[#252422] text-white" : "bg-[#f4f4f4]"} hover:bg-[#252422] hover:text-white duration-200 px-5 py-2 rounded-full font-medium`}>Este mes</button>
            <button onClick={() => setType("All")} className={`${type == "All" ? "bg-[#252422] text-white" : "bg-[#f4f4f4]"} hover:bg-[#252422] hover:text-white duration-200 px-5 py-2 rounded-full font-medium`}>Todas</button>
      </div>
      <div className="flex w-screen items-center">
        {classes.length > 0 ? (
          <div className="mx-4 md:mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {classes.map((item) => (
                <a key={item.id}>
                  <ClassCard item={item}/>
                </a>
            ))}
          </div>
        ) : (
          <div className={`${classes.length == 0 ? "mb-56" : ""} w-full mx-4 md:mx-6 flex justify-center mt-6`}>
            <div className='w-full flex-col justify-center'>
              <p className='text-center font-light text-lg'>No tienes ninguna clase más hoy. <br/>Añade alumnos para que reserven clases contigo.</p>
              <div className='pt-6 flex justify-center'>
                <AddStudentButton />
              </div>
            </div>
          </div>
        )}  
      </div>
    </main>
  )
}
