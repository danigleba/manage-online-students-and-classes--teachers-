import {db} from "@/utils/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export default async function (req, res) {
    const email = req.query.email 

    const tutorRef = collection(db, "tutors")
    const tutorSnap = query(tutorRef, where("email", "==", email))
    const queryTutorSnap = await getDocs(tutorSnap)
    
    try {
        queryTutorSnap.forEach((doc) => {
            if (doc.data().registered != true) {
                res.status(200).json({ tutorRegistered: false })
            }
            res.status(200).json({ tutorRegistered: true })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error!" })
    }
}