import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Students(props) {
    const [students, setStudents] = useState([])

  useEffect(() => {
    const url = "/api/students/get_students?tutor_email=" + props?.user?.email
    fetch(url)
        .then(response => response.json())
        .then(data => setStudents(data.data))

    console.log(students)
  }, [props?.user])

  return (
    <main className="pt-8 overflow-hidden">
      <h2 className='px-8'>Tus alumnos</h2>
      <div className="flex w-screen items-center">
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {students.map((item) => (
            <a href={`/${item.id}`} key={item.id}>
              <div className='w-full bg-white shadow-[0_0px_50px_rgb(0,0,0,0.08)] rounded-xl p-6'>
                <Image alt="Student's profile picture" height={50} width={59} src={item?.profile_url}/>
                <p>{item?.username}</p>
                {item && props?.user.email && item.paid_classes && (
                  <p>Saldo: {item.paid_classes[props.user.email] || 0} clases</p>
                )}
            </div>
            </a>
          ))}
        </div>
        </div>
    </main>
  )
}
