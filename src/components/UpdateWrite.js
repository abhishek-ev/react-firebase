import React, { useState, useEffect } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, set, get, update, remove } from 'firebase/database';
import { useParams } from 'react-router-dom';

function UpdateWrite() {
    const { firebaseId } = useParams();
    let [categoryName, setCategoryName] = useState("");
    let [items, setItems] = useState([]);
    let [newItem, setNewItem] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "Products/categoryitems/" + firebaseId);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const targetObject = snapshot.val();
                setCategoryName(firebaseId);
                setItems(targetObject.items ? Object.values(targetObject.items) : []);
            } else {
                alert("Data not found");
            }
        };
        fetchData();
    }, [firebaseId]);

    const updateData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "Products/categoryitems/" + categoryName);

        await set(newDocRef, {
            items: items.reduce((acc, item, index) => ({ ...acc, [index]: item }), {})
        });

        if (categoryName !== firebaseId) {
            const oldDocRef = ref(db, "Products/categoryitems/" + firebaseId);
            await remove(oldDocRef);
        }

        alert("Data updated successfully");
    };

    const addItem = () => {
        if (newItem) {
            setItems([...items, newItem]);
            setNewItem("");
        }
    };

    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    return (
        <div>
            <h3>Updating Category:</h3>
            <input type='text' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Update category name" />
            <input type='text' value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new item" />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)} style={{ marginLeft: "10px", color: "red" }}>Remove</button> 
                    </li>
                ))}
            </ul>
            <button onClick={updateData}>Update Data</button>
        </div>
    );
}

export default UpdateWrite;