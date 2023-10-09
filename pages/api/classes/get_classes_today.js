import { db } from '@/utils/firebase'
import { collection, getDocs, query, where, orderBy} from "firebase/firestore"

export default async function handler(req, res) {
    const tutor_email = req.query.tutor_email
    const today = new Date().toISOString().split('T')[0]

    const classesRef = collection(db, "classes")
    const classesSnap = query(classesRef, where("tutor", "==", tutor_email), orderBy("day", "asc"), orderBy("start_time", "asc"))
    const queryClassesSnap = await getDocs(classesSnap)
    try {
        const docs = []
        queryClassesSnap.forEach((doc) => {
            if (doc.data().day == today)
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