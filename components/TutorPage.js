import Image from "next/image"

export default function TutorPage({ tutor }) {
    return (
        <main>
            {/*Header*/}
            <div className="flex items-center justify-start w-full h-max absolute top-0 border-b border-[#dddddd]  px-8 md:px-20 py-4">
                <Image alt="Cornelio's logo" height={100} width={100} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/logo.png?alt=media&token=36fa1da0-40a9-4e2e-a6f7-9f3fc5d77510&_gl=1*1x34fcy*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5ODYwMjYxMS4xOTUuMS4xNjk4NjA0OTMyLjQ3LjAuMA.." />
            </div>
            {/*Tutor profile*/}
            <div className="mx-8 md:mx-20 flex items-center gap-6 mt-24">
                <Image className="rounded-full" alt="Student's profile picture" height={70} width={70} src={tutor?.profile_url} />
                <div>
                    <p className="font-bold text-xl">{tutor?.username}</p>   
                    <p className="font-light text-lg">Progresor de español con +20 años de experienceia</p>
                </div>
        </div>
        </main>
    )
}
