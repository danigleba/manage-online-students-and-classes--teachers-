import { db } from "@/utils/firebase"
import { doc, setDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const { user, price1, price10, price20, phoneNumber, email } = req.body
    try {
        const tutorRef = doc(db, "tutors", `${user.id}`)
        const newTutor = await setDoc(tutorRef, {
            email: email,
            id: user.id,
            profile_url: user.picture,
            full_name: user.name, 
            first_name: user.given_name, 
            last_name: user.family_name, 
            locale: user.locale,
            prices: {
                one_class: price1,
                ten_classes: price10,
                twenty_classes: price20,
            },
            phone_number: phoneNumber,
            students: [],
        })
        res.status(201).json({ newTutor: newTutor})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 
