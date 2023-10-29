import Image from "next/image"
import CancellClassButton from "./CancelClassButton"

export default function ClassCard(props) {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "sebtiembre", "octubre", "noviembre", "diciembre"]
    return (
        <main>
            <div className="w-full bg-white duration-200 shadow-[0px_0px_15px_rgb(0,0,0,0.02)] border border-[#dddddd] rounded-2xl p-5">
                <div className="flex justify-between pb-6">
                    <div className="flex gap-4 text-[#222222]">
                        <Image className="rounded-full" alt="Student's profile picture" height={50} width={50} src={props?.item?.student_profile} />
                        <div>
                            <p className="font-semibold">{props?.item?.day.substr(-2)} de {months[parseInt(props?.item?.day.slice(5, 7)) - 1]}, {props?.item?.start_time} h</p>
                            <p className="font-light">Con {props?.item.tutor_name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-4">
                    <div>
                        <button className="w-full bg-[#222222] font-medium text-white py-2 rounded-md hover:bg-[#000000] duration-200">Empezar clase</button>
                    </div>
                    <div className="flex justify-center">
                        <CancellClassButton item={props?.item} />
                    </div>
                </div>
            </div>
        </main>
    )
}
