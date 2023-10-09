import { useState } from 'react'
import {storage} from '@/utils/firebase'
import { ref, uploadBytes  } from '@firebase/storage'

function FileUpload(props) {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
    };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `${props?.student_email}/${props?.tutor_email}/${file.name}`)

      try {
        await uploadBytes(storageRef, file)
        console.log("File uploaded successfully!")
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    } else {
      console.warn("No file selected.")
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;
