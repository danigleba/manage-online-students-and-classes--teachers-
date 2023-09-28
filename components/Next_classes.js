import { useEffect, useState} from 'react'

export default function Next_classes() {
    const [classes, setClasses] = useState([])

    useEffect(() => {
      fetch("/api/classes/get_classes")
        .then(response => response.json())
        .then(data => setClasses(data.data))
    }, [])
    return (
        <main className="pt-8">
            <h2>Próximas clases</h2>
            <div className="grid grid-cols-3 gap-4 w-full">
                {classes?.map(item => (
                    <a key={item.id}>
                        <div className='w-full bg-white shadow-[0_0px_50px_rgb(0,0,0,0.08)] rounded-xl p-8'>
                            <div className="flex justify-between pb-8">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 bg-blue-200 rounded-full"></div>
                                    <div>
                                        <p className="font-bold">{new Date(item?.start_time?.seconds *1000).toLocaleString().substring(0, new Date(item?.start_time?.seconds *1000).toLocaleString().length-3) + "h a " + new Date(item?.end_time?.seconds *1000).toLocaleString().substring(new Date(item?.end_time?.seconds *1000).toLocaleString().length-8, new Date(item?.end_time?.seconds *1000).toLocaleString().length-3) + "h" }</p>
                                        <p className="font-light">Con {item.student}</p>
                                    </div>
                                </div>
                                <div className="flex classess-center bg-[#f4f4f4] rounded-md font-bold px-4 py-2 h-max">
                                    <p>+20 €</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <button className='bg-black font-medium text-white py-2 rounded-md hover:bg-[#f4f4f4] hover:text-black duration-200'>Empezar clase</button>
                                <button className='border-2 border-red-400 font-medim text-red-400 py-1.5 rounded-md hover:bg-red-400 hover:text-white duration-200'>Cancelar clase</button>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    )
}