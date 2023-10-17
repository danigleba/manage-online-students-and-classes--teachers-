import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const student_id = req.query.student_id

    const studentReff = doc(db, "students", student_id)
    const studentSnap = await getDoc(studentReff)
    try {
        res.status(200).json({ data: studentSnap.data() })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error."})
    }
}