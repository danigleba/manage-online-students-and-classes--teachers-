import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { TiDelete } from "react-icons/ti"

export default function CancellClassButton(props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [deleteId, setDeleteID] = useState("")

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
    <main>
        <button onClick={() => setDeleteID(props?.item?.id)} className='hover:bg-gray-200 duration-200 bg-[#f4f4f4] font-medium py-1.5 px-4 items-center gap-1.5 rounded-md w-max text-[#252422] text-sm flex justify-center'>
            <TiDelete strokeWidth="0" color="#252422" size={20} />
            <p>Cancelar clase</p>
        </button>
        {/*Confirmation modal*/}
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