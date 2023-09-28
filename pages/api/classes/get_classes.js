import { db } from '@/utils/firebase'
import { collection, getDocs, query } from "firebase/firestore"

export default async function handler(req, res) {
    const classesRef = collection(db, "classes")
    const classesSnap = query(classesRef)
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