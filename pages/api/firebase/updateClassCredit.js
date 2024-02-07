import { db } from "@/utils/firebase"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const { user, tutor } = req.body
    const tutor_id = tutor.uid
    const studentRef = doc(db, "students", `${user.uid}`)
    try {
        await updateDoc(studentRef, {
            tutors: arrayUnion({
                uid: tutor.uid,
                email: tutor.email,
                classCredit: user.tutors.tutor_id10 
            })
        })   
        res.status(200).json({ premiumUpdated: true })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 