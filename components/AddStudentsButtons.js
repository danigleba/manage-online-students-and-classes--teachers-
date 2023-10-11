import { HiOutlinePlus } from 'react-icons/hi'
import { useState } from 'react'

export default function AddStudentButton(props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <main className="h-max flex items-center">
        
                <button onClick={() => setIsOpen(true)} className='hover:bg-[#d63c4f] duration-200 flex items-center gap-2 bg-[#eb4c60] rounded-md text-sm py-2 px-4 text-white font-semibold'>
                    <HiOutlinePlus strokeWidth={3} />
                    <p>Añadir alumnos</p>
                </button>

             {/*Delete class confirmation modal*/}
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className="modal-overlay absolute inset-0 bg-gray-800 opacity-50" />
          <div className="m-4 modal-container bg-white w-4/10  rounded-xl shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-6 text-left px-6">
              <p className="text-2xl text-center font-bold">Comparte este mensaje con tus alumnos</p> 
              <p className='text-xl text-center font-normal'>para que reserven clases contigo</p>
              <div className='mt-6 w-full bg-[#f4f4f4] rounded-md text-center px-8 py-8'>
                <p className='text-left'>👋 Hola! <br/>Reserva clases conmigo en <a className='underline text-blue-400' href="https://students.getcornelio.com/signup">students.getcornelio.com/signup</a><br/> Al registrarte, búscame como: <b>{props?.user?.displayName}</b><br/>Así de fácil 🎉</p>
              </div>
              <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 modal-close py-2 bg-[#252422] hover:bg-[#000000] duration-200 py-1 rounded-md w-full text-white font-semibold cursor-pointer">
                    Cerrar
                </button>
            </div>
          </div>
        </div>
        </main>
    )
}