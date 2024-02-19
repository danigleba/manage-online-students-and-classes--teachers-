import {db} from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function (req, res) {
    const uid = req.query.uid
    const tutorRef = doc(db, "tutors", uid)
    const tutorSnap = await getDoc(tutorRef)
    const tutorExists = await tutorSnap.exists()
    res.status(200).json({ userExists: tutorExists})
}