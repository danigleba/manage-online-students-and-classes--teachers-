import { storage } from "@/utils/firebase";
import {ref, listAll, getDownloadURL} from '@firebase/storage'

async function getFilesFromFolder(folder) {
    const folderRef = ref(storage, folder)
  
    const files = await listAll(folderRef)
    const fileUrls = [];
  
    for (const file of files.items) {
      const downloadUrl = await getDownloadURL(file);
      fileUrls.push({
        name: file.name,
        downloadUrl,
      });
    }
  
    return fileUrls
}

export default async (req, res) => {
    const student_email = req.query.student_email
    const tutor_email = req.query.tutor_email
    const folder = `${student_email}/${tutor_email}`

  try {
    const files = await getFilesFromFolder(folder);
    res.status(200).json({data: files});
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
};


