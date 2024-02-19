import { useState } from "react"
import { useRouter } from "next/router"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import LoadingAnimation from "@/components/LoadingAnimation"

export default function CheckoutForm({ clientSecret, user, userData,  tutor, selectedPrice, numberOfClassesChosen }) {
    const router = useRouter()
    const stripe = useStripe()
    const elements = useElements()
    const paymentElementOptions = {
        layout: "tabs",
    }  
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
      
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://mileto.danigleba.com/platform",
            },
            redirect: "if_required"
        })
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (paymentIntent.status == "requires_payment_method") setIsLoading(false)
            if (paymentIntent.status == "succeeded") handleSuccesfulPayment()
        })
    }

    const handleSuccesfulPayment = async () => {
        const response = await fetch(`/api/firebase/updateClassCredit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user, userData: userData, tutor: tutor, numberOfClassesChosen: numberOfClassesChosen })    
        })
        const data = await response.json()
    }
    return (
        <form className="w-full md:w-1/2" id="payment-form" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl md:text-3xl pb-6">{numberOfClassesChosen} clases con {tutor.username}</h2>
            <PaymentElement id="payment-element" options={paymentElementOptions}/>
            <button id="submit" disabled={isLoading || !stripe || !elements} className="w-full text-base mt-8 hover:scale-100 bg-[#222222] hover:bg-black text-white rounded-md py-2">
                <span id="button-text">
                    {isLoading ? 
                        <div className="flex justify-center items-center gap-4">
                            Loading...
                            <LoadingAnimation />
                        </div> 
                        : 
                        `Comprar por ${selectedPrice/100} €`}
                </span>
            </button>
        </form> 
    )
}