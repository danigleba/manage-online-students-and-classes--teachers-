import { db } from "@/utils/firebase"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const { user, userData, tutor, numberOfClassesChosen} = req.body
    const studentRef = doc(db, "students", `${user.uid}`)
    const currentClassCredit = userData?.tutors?.find(tutorObject => tutorObject.uid == tutor.uid).classCredit
    try {
        let updatedTutors = await userData.tutors.map(tutorObject => {
            if (tutorObject.uid === tutor.uid) {
                return { ...tutorObject, classCredit: parseInt(currentClassCredit +  numberOfClassesChosen)}
            }
            return tutorObject
        })     
     
        await updateDoc(studentRef, {
            tutors: updatedTutors,
        })   
        res.status(200).json({ classCreditUpdated: true })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 