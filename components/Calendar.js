import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import AddStudentButton from "./AddStudentsButtons"
import ClassCard from "./ClassCard"

export default function Calendar(props) {
  const router = useRouter()
  const [classes, setClasses] = useState([])
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "sebtiembre", "octubre", "noviembre", "diciembre"]
  const [type, setType] = useState("Week")
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
    <main className="pt-8">
      <h2 className='px-8'>Clases programadas</h2>
      <div className='flex gap-4 px-8 text-sm font-semibold mt-4 mb-6'>
            <button onClick={() => setType("Week")}  className={`${type == "Week" ? "bg-[#252422] text-white" : "bg-[#f4f4f4]"} hover:bg-[#252422] hover:text-white duration-200 px-5 py-2 rounded-full font-medium`}>Esta semana</button>
            <button onClick={() => setType("Month")}  className={`${type == "Month" ? "bg-[#252422] text-white" : "bg-[#f4f4f4]"} hover:bg-[#252422] hover:text-white duration-200 px-5 py-2 rounded-full font-medium`}>Este mes</button>
            <button onClick={() => setType("All")} className={`${type == "All" ? "bg-[#252422] text-white" : "bg-[#f4f4f4]"} hover:bg-[#252422] hover:text-white duration-200 px-5 py-2 rounded-full font-medium`}>Todas</button>
      </div>
      <div className="flex w-screen items-center">
        {classes.length > 0 ? (
          <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {classes.map((item) => (
                <a key={item.id}>
                  <ClassCard item={item}/>
                </a>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center mt-6">
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
