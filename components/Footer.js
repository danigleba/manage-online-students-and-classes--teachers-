export default function Footer() {
    return (  
        <footer className="mt-24 text-white bg-[#252422] mb-20 md:mb-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a className="flex items-center mb-4 sm:mb-0">
                        <span className="self-center text-2xl font-semibold text-white">cornelio</span>
                    </a>
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