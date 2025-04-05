import React, { useEffect, useState } from 'react';
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
  const [categpryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [foodItem, setFoodItem] = useState({
    category: "",
    name: "", 
    description: "",
    image:""
  });
  const [items, setItems] = useState([]);  // List of items under the category



  useEffect(() => {
    loadCategoryList();
    loadFoodItems();
  }, []);

  const saveData = async () => {


    setFoodItem({
      category: foodItem.category,
      name: foodItem.name,
      description: foodItem.description,
      image:foodItem.image
    });

    console.log("foodItem",foodItem)

    await addDoc(collection(db, "menuItems"), foodItem).then(loadFoodItems)
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFoodItem({...foodItem, image:base64});
  }

  const saveCategory = async () => {
    await addDoc(collection(db, "categories"), {
      name:categpryName 
    }).then(()=>{
      loadCategoryList()
    })
  };

  const loadCategoryList  = async () => {
    const querySnapshot = await getDocs(collection(db,"categories"));
    const categoryList = querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
    console.log("categoryList",categoryList)
    setCategoryList(categoryList)
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const loadFoodItems = async ()=> {
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    const foodItemList = querySnapshot.docs.map(doc => doc.data())
    console.log("foodItemList",foodItemList)
    setItems(foodItemList)
  }

  return (
    <>
    <form style={{border:"2px solid black",padding:"1rem"}}>
      <label htmlFor="category">Create Category</label>
      <input
        type="text"
        id="categoryName"
        name="categoryName"
        placeholder="Category"
        value={categpryName}
        onChange={(e) => setCategoryName(e.target.value )}
      />
      <br/>
      <button type="button" onClick={saveCategory}>
        Save Category
      </button>
    </form>
    <br/><br/>
      <ul>
        {categoryList.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    <br/><br/>
    <form style={{border:"2px solid black",padding:"1rem"}}>
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={foodItem.category}
        onChange={(e) => setFoodItem({ ...foodItem, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categoryList.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
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
      <br/><br/>
      <button type="button" onClick={saveData}>Save Category and Items</button>
      <br/><br/>
    </form>
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
      {items.map((item,index) => (
        <li key={index}>
          <img src={item.image} alt={item.name} style={{width: '6rem',height:'6rem'}} />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>


    </>

  );
}

export default Write;
