import { db } from '@/utils/firebase'
import { collection, getDocs, query, where, orderBy} from "firebase/firestore"

export default async function handler(req, res) {
    const student_email = req.query.student_email

    const classesRef = collection(db, "classes")
    const classesSnap = query(classesRef, where("student", "==", student_email), orderBy("day", "asc"), orderBy("start_time", "asc"))
    const queryClassesSnap = await getDocs(classesSnap)
    try {
        const docs = []
        queryClassesSnap.forEach((doc) => {
                docs.push({
                    id: doc.id,
                    ...doc.data(),
                })
        })
        res.status(200).json({ data: docs })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error."})
    }
}