import { db } from "@/utils/firebase"
import { collection, updateDoc, query, where, getDocs } from "firebase/firestore"

export default async function (req, res) {
    const { price1, price10, price20, vc_platform, email, phoneNumber } = req.query 

    const tutorRef = collection(db, "tutors")
    const tutorSnap = query(tutorRef, where("email", "==", email))
    const queryTutorSnap = await getDocs(tutorSnap)
    
    try {
        const updatePromises = []
        queryTutorSnap.forEach((doc) => {
            const updatePromise = updateDoc(doc.ref, {
                phone_number: phoneNumber,
                prices: {
                    "one_class": parseInt(price1),
                    "ten_classes": parseInt(price10),
                    "twenty_classes": parseInt(price20)
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