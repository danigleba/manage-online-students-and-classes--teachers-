import { useEffect, useState } from "react"
import Image from "next/image"
import AddStudentButton from "./AddStudentsButtons"
import { BsArrowRight } from "react-icons/bs"

export default function Students(props) {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const url = "/api/students/get_students?tutor_email=" + props?.user?.email
    fetch(url)
        .then(response => response.json())
        .then(data => setStudents(data.data))
  }, [props?.user])
  return (
    <main id="students">
      <div className="mb-6 flex items-center gap-4 px-4 md:px-6">
        <div className="rounded-md flex items-center">
          <h2>Tus alumnos</h2>
        </div>
        <AddStudentButton user={props?.user}/>
      </div>
      <div className="flex w-screen items-center">
        {students.length > 0 ? (
          <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {students.map((item) => (
              <a href={`/s/${item.id}`} key={item.id}>
                <div className="flex justify-between px-6 md:px-12 shadow-[0_0px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_0px_30px_rgb(0,0,0,0.14)] duration-200 items-center w-full bg-white rounded-lg p-4 md:p-6 text-[#252422]">
                  <div className="flex gap-4 md:gap-6">
                    <div>
                      <Image className="rounded-full" alt="Student's profile picture" height={60} width={60} src={item?.profile_url}/>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-md md:text-lg">{item?.username}</p>
                      {item && props?.user.email && item.paid_classes && (
                        <p className="bg-[#f4f4f4] px-2 md:px-4 py-1 text-center rounded-md font-semibold text-[#252422] text-xs md:text-sm">Le quedan {item.paid_classes[props.user.email] || 0} clases</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <BsArrowRight size={22}/>
                  </div>
                </div>
              </a>
            ))}
          </div>
          ) : (
            <div className={`${students.length == 0 ? "mb-32" : ""} flex justify-center w-full`}>
               <div className='w-full flex-col justify-center'>
                 <p className='text-center font-light text-md md:text-lg'>Aún no tienes ningún alumno. <br/>Añade alumnos para que reserven clases contigo.</p>
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
