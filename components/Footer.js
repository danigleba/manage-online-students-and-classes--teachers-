import Image from "next/image"

export default function Footer() {
    return (  
        <footer className="mt-24 text-white bg-[#252422] mb-20 md:mb-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <button  className="pb-4 md:pb-0" onClick={() => router.push("/")}>
                        <Image alt="Cornelio's logo" height={80} width={80} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/cornelio_logo_white.png?alt=media&token=60e755c6-df09-4c5b-8828-7f8cef8e8aeb&_gl=1*uhivhl*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5NzUzNzMyMi4xOTQuMS4xNjk3NTM3MzI3LjU1LjAuMA.." />
                    </button>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
                        <li>
                            <a className="mr-4 md:mr-6 hover:underline">Sobre nosotros</a>
                        </li>
                        <li>
                            <a className="mr-4 md:mr-6 hover:underline">Política de privacidad</a>
                        </li>
                        <li>
                            <a className="hover:underline">Contacto</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 lg:my-8 border-gray-200 sm:mx-auto"/>
                <span className="block text-sm text-white sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Cornelio</a>. Todos los derechos reservados.</span>
            </div>
        </footer>
    )
}