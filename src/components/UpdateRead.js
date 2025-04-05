import React ,{useState ,useEffect} from 'react'
import app from "../firebaseConfig"
import { getDatabase,ref,get,remove } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

function UpdateRead() {
    let navigate = useNavigate();
    let [categories, setCategories] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "Products/categoryitems");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const myData = snapshot.val();
            const tempArray = Object.keys(myData).map(categoryId => ({
                ...myData[categoryId],
                categoryId
            }));
            setCategories(tempArray);
        } else {
            alert("No data found");
        }
    };
    fetchData();
}, []);

    const deleteCategory = async (categoryId) => {
        const db = getDatabase(app);
        const dbRef = ref(db, "Products/categoryitems/" + categoryId);
        await remove(dbRef);
        setCategories(categories.filter(category => category.categoryId !== categoryId));
    };

    return (
        <div>
            <ul>
                {categories.map((item, index) => (
                    <div key={index}>
                        <li>
                            {item.categoryId}: {item.items ? Object.values(item.items).join(", ") : "No Items"}
                        </li>
                        <button className='update' onClick={() => navigate(`/updatewrite/${item.categoryId}`)}>Update</button>
                        <button className='delete' onClick={() => deleteCategory(item.categoryId)}>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default UpdateRead;
