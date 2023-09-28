import {db} from '@/utils/firebase'
import { collection, addDoc, query, where, getDocs} from "firebase/firestore"; 

export default async function (req, res) {
    const profile_url = req.query.profile_url
    const email = req.query.email
    const username = req.query.username

    //Check if user already exists
    const tutorRef = collection(db, "tutors")
    const tutorSnap = query(tutorRef, where("email", "==", email))
    const queryTutorSnap = await getDocs(tutorSnap)
    let tutorExists = false
    
    queryTutorSnap.forEach((doc) => {
        if (doc.id !== "") {
            tutorExists = true
        }})

    if (tutorExists) {
        res.status(200).json({tutorCreated: true})
    } else {
        try {
            const newTutor = await addDoc(collection(db, "tutors"), {
                    email: email,
                    username: username,
                    profile_url: profile_url,
                    prices: [],
                    phone_number: "",
                    students: [],
                    vc_platform: "",
                    registered: false
                })
            res.status(200).json({tutorCreated: true})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}