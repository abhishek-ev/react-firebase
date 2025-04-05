import React ,{useState ,useEffect} from 'react'
import app from "../firebaseConfig"
import { getDatabase,ref,get } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

function Read() {

    let[category,setCategory]=useState([])
    let navigate = useNavigate();
    
    useEffect(()=>{
    const featchData= async ()=>{
        const db=getDatabase(app)
        const categoryRef=ref(db,"Products/categoryitems");

        const snapshot = await get(categoryRef);
        if(snapshot.exists()){
            const data = snapshot.val();
            const categoryList = Object.keys(data).map((key) => ({
                Category: key,        // The category name (key of the category)
                items: data[key].items // The items under that category
              }));
              setCategory(categoryList);
        }else{
            alert("error")
        }
    }
    featchData()
  },[])
  return (
    <div>
     <ul>
        {category.map((item, index)=>(
            <li key={index}> {item.Category} : 
            <ul>
              {item.items.map((subItem, subIndex) => (
                <li key={subIndex}>{subItem}</li>
              ))}
            </ul>
            </li>
        ))}
     </ul>
     <button className='write' onClick={() => navigate(`/write`)}>Add new item</button>
     <button className='update' onClick={() => navigate(`/updateread`)}>Update or edit</button>
    </div> 
  )
}

export default Read
