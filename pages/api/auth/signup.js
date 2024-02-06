import { db } from "@/utils/firebase"
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore"

export default async function (req, res) {
    const { phoneNumber, price1,  price10, price20, vc_platform, user } = req.body
    console.log(user)
    try {
        // Check if user already exists
        const tutorRef = collection(db, "tutors")
        const tutorSnap = await getDocs(query(tutorRef, where("email", "==", user.email)))
        let tutorExists = false
        
        tutorSnap.forEach((doc) => {
            if (doc.exists()) {
                tutorExists = true
            }
        })

        if (tutorExists) {
            res.status(200).json({ tutorCreated: true })
        } else {
            await setDoc(doc(db, "tutors", `${user.uid}`), { 
                email: user.email,
                username: user.displayName,
                profile_url: user.photoURL,
                prices: {
                    one_class: price1,
                    ten_classes: price10,
                    twenty_classes: price20
                },
                phone_number: phoneNumber,
                students: [],
                vc_platform: vc_platform,
            })
            res.status(200).json({ tutorCreated: true })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
