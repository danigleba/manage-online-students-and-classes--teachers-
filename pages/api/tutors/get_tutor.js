import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const tutor_id = req.query.tutor_id

    const tutorRef = doc(db, "tutors", tutor_id)
    const turoSnap = await getDoc(tutorRef)
    try {
        res.status(200).json({ data: turoSnap.data() })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error."})
    }
}