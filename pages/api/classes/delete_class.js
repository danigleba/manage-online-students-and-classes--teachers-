import { db } from "@/utils/firebase"
import { doc, deleteDoc, getDoc, getDocs, query, collection, where, updateDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const class_id = req.query.class_id

    const classRef = doc(db, "classes", class_id)
    const classSnap = await getDoc(classRef)
    const tutor = classSnap.data().tutor
    const student = classSnap.data().student

    const studentRef = collection(db, "students")
    const studentSnap = query(studentRef, where("email", "==", student))
    const queryStudentsSnap = await getDocs(studentSnap)

    try {
        queryStudentsSnap.forEach((doc) => {
            const studentDocRef = doc.ref
            const paidClasses = doc.data().paid_classes
            let tutorValue = paidClasses[tutor]
            const updatedPaidClasses = {
                ...paidClasses,
                [tutor]: parseInt(tutorValue) + 1,
            }
            updateDoc(studentDocRef, { paid_classes: updatedPaidClasses })
        })
        await deleteDoc(doc(db, "classes", class_id))
        res.status(200).json({ classDeleted: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error."})
    }
}