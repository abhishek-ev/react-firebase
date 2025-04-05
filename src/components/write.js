import React, { useState } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, set, push, update } from 'firebase/database';

function Write() {
  const [inputValue1, setInputValue1] = useState("");  // Category name
  const [inputValue2, setInputValue2] = useState("");  // Item name input
  const [items, setItems] = useState([]);  // List of items under the category

  const saveData = async () => {
    if (inputValue1 === "" || items.length === 0) {
      alert("Please enter a category name and at least one item.");
      return;
    }

    const db = getDatabase(app);
    const categoryRef = ref(db, `Products/categoryitems/${inputValue1}`);

    // Update the category with new items
    update(categoryRef, {
      items: items
    }).then(() => {
      alert("Data saved successfully");
      // Reset the form after saving
      setInputValue1("");
      setItems([]);
    }).catch((error) => {
      console.log("Error: ", error.message);
    });
  };

  const addItem = () => {
    if (inputValue2 !== "") {
      setItems([...items, inputValue2]);  // Add new item to the list
      setInputValue2("");  // Clear the input field for item name
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Category"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Item"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      
      <h3>Items under {inputValue1}:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button onClick={saveData}>Save Category and Items</button>
    </div>
  );
}

export default Write;
