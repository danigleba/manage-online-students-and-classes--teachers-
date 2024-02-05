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
      <div className="mb-4 flex justify-between md:justify-start items-center gap-4 px-6 md:px-10">
        <div className="rounded-md flex items-center">
          <h2>Tus alumnos</h2>
        </div>
        <AddStudentButton user={props?.user}/>
      </div>
      <div className="flex w-screen items-center">
        {students.length > 0 ? (
          <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {students.map((item) => (
              <a href={`/s/${item.id}`} key={item.id}>
                <div className="flex justify-between shadow-[0px_0px_15px_rgb(0,0,0,0.02)] border border-[#dddddd] duration-200 items-center w-full bg-white rounded-xl px-5 py-3 text-[#252422]">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div>
                      <Image className="rounded-full" alt="Student's profile picture" height={50} width={50} src={item?.profile_url}/>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-md text-[#222222]">{item?.username}</p>
                      {item && props?.user.email && item.paid_classes && (
                        <p className="bg-[#f7f7f7] px-4 py-1 border border-[#dddddd] text-center rounded-md font-semibold text-[#222222] text-sm">Le quedan {item.paid_classes[props.user.email] || 0} clases</p>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          ) : (
            <div className="flex justify-center w-full">
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
