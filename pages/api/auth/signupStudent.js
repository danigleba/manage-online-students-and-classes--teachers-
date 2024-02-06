import { db } from "@/utils/firebase"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"

export default async function (req, res) {
    const { user } = req.body
    const profile_url = req.query.profile_url
    const username = req.query.username

    //Check if user already exists
    const studentRef = collection(db, "students")
    const studentSnap = query(studentRef, where("email", "==", user.email))
    const queryStudentSnap = await getDocs(studentSnap)
    let studentExists = false
    
    queryStudentSnap.forEach((doc) => {
        if (doc.id !== "") {
            studentExists = true
            res.status(200).json({data: doc.data()})
        }})

    if (!studentExists) {
        try {
            const newStudent = await addDoc(collection(db, "students"), user?.uid, {
                    email: user?.email,
                    username: user?.displayName,
                    profile_url: user?.photoURL,
                    tutor: [],
                    paid_classes: []
            })
            res.status(200).json({ data: newStudent})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}