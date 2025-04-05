import React, { useState } from 'react';
import db from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Write() {
  const [foodItem, setFoodItem] = useState({
    category: "",
    name: "", 
    description: "",
    image:""
  });
  const [items, setItems] = useState([]);  // List of items under the category

  const saveData = async () => {


    setFoodItem({
      category: foodItem.category,
      name: foodItem.name,
      description: foodItem.description,
      image:foodItem.image
    });

    console.log("foodItem",foodItem)

    // if (inputValue1 === "" || items.length === 0) {
    //   alert("Please enter a category name and at least one item.");
    //   return;
    // }

    await addDoc(collection(db, "menuItems"), foodItem);
  };

  const addItem = () => {
    // if (inputValue2 !== "") {
    //   setItems([...items, inputValue2]);  // Add new item to the list
    //   setInputValue2("");  // Clear the input field for item name
    // }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFoodItem({...foodItem, image:base64});
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form>
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Category"
        value={foodItem.category}
        onChange={(e) => setFoodItem({ ...foodItem, category: e.target.value })}
      />
      <br/>
      <label htmlFor="foodName">Name:</label>
      <input
        type="text"
        id="foodName"
        name="foodName"
        placeholder="Name"
        value={foodItem.name}
        onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })}
      />
      <br/>
      <label htmlFor="foodName">Description:</label>
      <input
        type="text"
        id="foodName"
        name="foodName"
        placeholder="Description"
        value={foodItem.description}
        onChange={(e) => setFoodItem({ ...foodItem, description: e.target.value })}
      />
      <br/>
      <label htmlFor="foodName">Image:</label>
      <input
        type="file"
        id="foodImage"
        name="foodImage"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => handleFileChange(e)}
      />
      <br/>
      <button type="button" onClick={saveData}>Save Category and Items</button>
    </form>
  );
}

export default Write;
