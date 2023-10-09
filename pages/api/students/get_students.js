import { db } from '@/utils/firebase'
import { collection, getDocs, query} from "firebase/firestore"

export default async function handler(req, res) {
    const tutor_email = req.query.tutor_email

    const studentsRef = collection(db, "students")
    const studentsSnap = query(studentsRef)
    const queryStudentsSnap = await getDocs(studentsSnap)
    try {
        const docs = []
        queryStudentsSnap.forEach((doc) => {
            if (doc.data().tutors && doc.data().tutors.includes(tutor_email)) {
                    docs.push({
                        id: doc.id,
                        ...doc.data(),
                    })
            } 
        })
        res.status(200).json({ data: docs })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error."})
    }
}