import { useState } from "react"
import { HiOutlinePlus } from "react-icons/hi"

export default function AddStudentButton(props) {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <main>
        <button onClick={() => setIsOpen(true)} className="hover:bg-[#d63c4f] duration-200 flex items-center gap-2 bg-[#eb4c60] rounded-md text-sm py-2 px-4 text-white font-semibold">
          <HiOutlinePlus strokeWidth={3} />
          <p>Añadir alumnos</p>
        </button>
        {/*Add student Modal*/}
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className=" modal-overlay absolute inset-0 bg-gray-800 opacity-50" />
          <div className="mx-6 md:mx-10 modal-container bg-white w-full md:w-max rounded-2xl z-50 overflow-y-auto">
            <div className="modal-content p-5 text-center">
              <p className="text-2xl font-bold text-[#222222]">Comparte este mensaje con tus alumnos</p> 
              <p className="text-xl font-normal text-[#222222]">para que reserven clases contigo</p>
              <div className="mt-4 w-full bg-[#f7f7f7] border border-[#dddddd] rounded-xl text-center p-8">
                <p className="text-left text-[#222222]">👋 Hola! <br/>Reserva clases conmigo en <a className="underline text-blue-400" href="https://students.getcornelio.com/signup">students.getcornelio.com/signup</a><br/> Al registrarte, búscame como: <b>{props?.user?.displayName}</b><br/>Así de fácil 🎉</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 modal-close py-2 bg-[#222222] hover:bg-[#000000] duration-200 rounded-lg w-full text-white font-semibold cursor-pointer">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </main>
    )
}