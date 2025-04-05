import React ,{useState} from 'react'
import app from "../firebaseConfig"
import {ref, uploadBytes ,getDownloadURL} from "firebase/storage"
import { getDatabase} from 'firebase/firestore'


function ImageUpload() {
    const [imageUpload, setImageUpload] = useState();

    const uploadFile = () =>{
        const db=getDatabase(app)
        if(!imageUpload){
            return
        }
        const imageRef = ref(db,`Posters/${imageUpload.name}`);
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                console.log(url)
            })
        })
    }
  return (
    <div>
        <input type='file' onChange={(e)=>{setImageUpload(e.target.files[0])}}></input>
      <button onClick={uploadFile}>upload</button>
      <img src=''></img>
    </div>
  )
}

export default ImageUpload
