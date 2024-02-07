import Image from "next/image"
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)

export default function TutorPage({ tutor, availableClasses, user}) {
    const [clientSecret, setClientSecret] = useState()
    const [state, setState] = useState("Pricing table")
    const [selectedPrice ,setSelectedPrice] = useState()
    const appearance = {
        theme: "stripe",
        variables: {
          colorPrimary: "#dddddd",
        }
      }
      const loader = "auto" 
      const stripeOptions = {
        clientSecret,
        appearance,
        loader
      }
    const createPaymentIntent = async (price) => {
        setSelectedPrice(price)
        const stripe = await stripePromise
        const response = await fetch(`/api/stripe/createPaymentIntent?price=${price}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        setClientSecret(`${data.clientSecret}`)
        setState("Checkout")
    }
    return (
        <main className="mb-24">
            {/*Header*/}
            <div className="flex items-center justify-between w-full h-max top-0 border-b border-[#dddddd] px-8 md:px-20 py-4">
                <Image alt="Cornelio's logo" height={100} width={100} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/logo.png?alt=media&token=36fa1da0-40a9-4e2e-a6f7-9f3fc5d77510&_gl=1*1x34fcy*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5ODYwMjYxMS4xOTUuMS4xNjk4NjA0OTMyLjQ3LjAuMA.." />
                <div className="flex items-center gap-4 text-[#222222]">
                    <div>
                        <p className="hidden md:flex font-semibold text-lg">{user?.displayName}</p>
                    </div>
                    <Image className='rounded-full' alt="Tutor's profile picture" height={45} width={45} src={user?.photoURL}/>
                </div>
            </div>
            {/*Tutor profile*/}
            <div className="mx-8 md:mx-20 flex items-center justify-center gap-6 mt-12">
                <Image className="rounded-full" alt="Student's profile picture" height={70} width={70} src={tutor?.profile_url} />
                <div>
                    <p className="font-bold text-xl">{tutor?.username}</p>   
                    <p className="font-light text-lg">Progresor de español con +20 años de experienceia</p>
                </div>
        </div>
        <div className="mx-8 md:mx-20 pt-12 space-x-12">

            {availableClasses > 0 && (
                <>
                    <button className="bg-red-200">Buy clases</button>
                    <button className="bg-blue-200">Book classes</button>
                </>
            )}
            {availableClasses <= 0 && (
                <>
                {!clientSecret && (
                    <div className="w-full">
                    <h2 className="text-center text-2xl md:text-3xl md:pb-3">Compra clases con {tutor?.username?.substring(0, tutor.username.indexOf(" "))}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4 text-center font-bold text-lg rounded">
                        <div className="checkout-card md:mt-11" onClick={() => createPaymentIntent(tutor?.prices?.one_class * 100)} type="submit">
                            <p className="bg-[#f4f4f4] rounded-md py-1">1 clase</p>
                            <p className="text-3xl">{tutor?.prices?.one_class} €</p>
                            <button className="checkout-btn">Comprar</button> 
                            <div className="font-normal text-xs">   
                                <p className="pb-2">Todas las clases son de 1 hora.</p>
                                <p>Toda clase cancelada será devuelta al alumno.</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full items-center justify-center">
                            <div className="font-semibold bg-[#eb4c60] w-1/2 text-center text-white rounded-full mb-2 py-1">
                                <p>Más popular</p>
                            </div>
                            <div className="checkout-card border-[#eb4c60] border-2 w-full" onClick={() => createPaymentIntent(tutor?.prices?.ten_classes * 100)} type="submit">
                                <p className="bg-[#eb4c60] text-white rounded-md py-1">10 clases</p>
                                <p className="text-3xl">{tutor?.prices?.ten_classes} €<a className="text-lg font-light"> / clase</a></p>
                                <button className="checkout-btn">Comprar</button> 
                                <div className="font-normal text-xs">   
                                    <p className="pb-2">Todas las clases son de 1 hora.</p>
                                    <p>Toda clase cancelada será devuelta al alumno.</p>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-card md:mt-11" onClick={() => createPaymentIntent(tutor?.prices?.twenty_classes * 100)} type="submit">
                            <p className="bg-[#f4f4f4] rounded-md py-1">20 clases</p>
                            <p className="text-3xl">{tutor?.prices?.twenty_classes} €<a className="text-lg font-light"> / clase</a></p>
                            <button className="checkout-btn">Comprar</button> 
                            <div className="font-normal text-xs">   
                                <p className="pb-2">Todas las clases son de 1 hora.</p>
                                <p>Toda clase cancelada será devuelta al alumno.</p>
                            </div>
                        </div>

                    </div>
                </div>
                )}
                {clientSecret && (
                    <div className="flex justify-center">
                        <Elements options={stripeOptions} stripe={stripePromise}>
                            <CheckoutForm clientSecret={clientSecret} user={user} tutor={tutor} selectedPrice={selectedPrice} />
                        </Elements>
                    </div>
                )}
                </>
            )}
        </div>
        </main>
    )
}
