import { useState } from 'react'
import {storage} from '@/utils/firebase'
import { ref, uploadBytes  } from '@firebase/storage'
import { HiOutlinePlus } from 'react-icons/hi'
import { useRouter } from 'next/router'

export default function FileUpload(props) {
    const router = useRouter()
    const [file, setFile] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
    };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `${props?.student_email}/${props?.tutor_email}/${file.name}`)
      try {
        await uploadBytes(storageRef, file)
        console.log("File uploaded successfully!")
        router.reload()
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    } else {
      console.warn("No file selected.")
    }
  }

  return (
    <main>
      <button onClick={() => setIsOpen(true)} className='h-full hover:bg-[#5047c9] duration-200 flex items-center gap-2 bg-[#6156f6] rounded-md text-sm py-2 px-4 text-white font-semibold'>
        <HiOutlinePlus strokeWidth={3} />
        <p>Subir docs</p>
      </button>
      {/*Delete class confirmation modal*/}
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className="modal-overlay absolute inset-0 bg-gray-800 opacity-50" />
          <div className="modal-container bg-white w-4/10  rounded-xl shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-8 text-left px-8">
              <p className="text-2xl text-center font-bold">Publica documentos para tu alumno </p> 
              <div className='flex gap-4 pt-6'>
                <div className=''>
                  <label className="block mb-2 text-md font-medium text-gray-900">Escoge un archivo</label>
                  <input onChange={handleFileChange} className="file:font-semibold block w-full border border-gray-200 rounded-md text-sm cursor-pointer file:cursor-pointer file:bg-transparent file:border-0 file:bg-gray-200 file:hover:bg-gray-300 file:mr-4 file:py-3 file:px-4 " type="file" />
                </div>
              </div>
              <div className="mt-6 w-full flex w-full gap-4 modal-body">
                  <button className='bg-[#6156f6] hover:bg-[#5047c9] py-3 w-1/2 rounded-md font-semibold text-white' onClick={handleUpload}>Publicar doc</button>
                  <button onClick={() => setIsOpen(false)} className='py-2 w-1/2 bg-[#252422] hover:bg-[#000000] font-semibold text-white rounded-md'>Cerrar</button>
                </div>
            </div>
          </div>
        </div>
  </main>
  )
}

