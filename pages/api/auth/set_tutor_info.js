import {db} from '@/utils/firebase'
import { collection, updateDoc, query, where, getDocs} from "firebase/firestore"; 

export default async function (req, res) {
    const phoneNumber = req.query.phoneNumber
    const price1 = req.query.price1
    const price10 = req.query.price10    
    const price25 = req.query.price25
    const vc_platform = req.query.vc_platform
    const email = req.query.email

    const tutorRef = collection(db, "tutors")
    const tutorSnap = query(tutorRef, where("email", "==", email))
    const queryTutorSnap = await getDocs(tutorSnap)
    
    try {
        const updatePromises = [];

        queryTutorSnap.forEach((doc) => {
            const updatePromise = updateDoc(doc.ref, {
                phone_number: phoneNumber,
                prices: {
                    "1_class": parseInt(price1),
                    "10_classes": parseInt(price10),
                    "25_classes": parseInt(price25)
                },
                vc_platform: vc_platform,
                registered: true
            })
            updatePromises.push(updatePromise)
        })
        await Promise.all(updatePromises)
        res.status(200).json({ tutorUpdated: true })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error!" })
    }
}