import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"; 

export default async function (req, res) {
    const { user } = req.body
    try {
        const tutorRef = doc(db, "tutors", `${user.id}`)
        const tutorSnap = await getDoc(tutorRef)
        const tutorData = tutorSnap.data()
        res.status(200).json({ user: tutorData})
    } catch (error) {
        res.status(500).json(error)
    }
}