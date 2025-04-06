import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getDocs, addDoc, updateDoc, deleteDoc, collection, doc, query, where } from 'firebase/firestore';
import Loader from './Loader';
import NoData from './NoData';

import db from '../firebaseConfig';

var $ = require('jquery');

function MenuList() {
  const [loader, setLoader] = useState(true);
  const [modalMode, setModalMode] = useState("Add");
  const [categpryName, setCategoryName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [foodItem, setFoodItem] = useState({
    category: "",
    name: "",
    description: "",
    image: ""
  });
  const [items, setItems] = useState([]);  // List of items under the category

  useEffect(() => {
    loadCategoryList().then(() => {
      loadFoodItems()
    });
  }, []);

  const loadCategoryList = async () => {
    setLoader(true)
    await getDocs(collection(db, "categories")).then((querySnapshot) => {
      const categoryList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("categoryList", categoryList)
      setLoader(false)
      setCategoryList(categoryList)
    });
  };

  const saveCategory = async () => {
    if (!categpryName) {
      alert("Please enter a category name");
      return;
    }
    setLoader(true)
    const categoryExists = categoryList.some(category => category.name === categpryName);
    if (categoryExists) {
      alert("Category name already exists");
      setLoader(false);
      return;
    }

    await addDoc(collection(db, "categories"), {
      name: categpryName
    }).then(() => {
      loadCategoryList().then(() => {
        setCategoryName("");
        setLoader(false);
      });
    });
  };

  const deleteCategory = async (id) => {
    setLoader(true)

    const q = query(collection(db, "menuItems"), where("category", "==", id));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setLoader(false);
      alert("Please delete items under this category first");
    } else {
      await deleteDoc(doc(db, "categories", id)).then(() => {
        loadCategoryList().then(() => {
          setLoader(false);
        });
      });
    }
  };

  const saveData = async () => {
    setLoader(true)

    if (!foodItem.image) {
      alert("Please upload an image");
      setLoader(false);
      return;
    }

    setFoodItem({
      category: foodItem.category,
      name: foodItem.name,
      description: foodItem.description,
      image: foodItem.image
    });

    console.log("foodItem", foodItem)

    if (modalMode === "Add") {
      await addDoc(collection(db, "menuItems"), foodItem).then(() => {
        loadFoodItems()
        $('#staticBackdropBtn').click();
        setFoodItem({
          category: "",
          name: "",
          description: "",
          image: ""
        })
        setLoader(false)
      })
    } else {
      await updateDoc(doc(db, "menuItems", foodItem.id), foodItem).then(() => {
        loadFoodItems()
        $('#staticBackdropBtn').click();
        setFoodItem({
          category: "",
          name: "",
          description: "",
          image: ""
        })
        setLoader(false)
      })
    }

  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFoodItem({ ...foodItem, image: base64 });
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const loadFoodItems = async (category = "") => {
    setLoader(true)
    var q = collection(db, "menuItems")
    if (category) {
      q = query(collection(db, "menuItems"), where("category", "==", category));
    }
    await getDocs(q).then((querySnapshot) => {
      console.log("querySnapshot", querySnapshot.docs)
      const foodItemList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log("foodItemList", foodItemList)
      setItems(foodItemList)
      setLoader(false)
    })
  }

  const EditItem = async (name) => {
    console.log("id", name)
    setModalMode("Update")
    setLoader(true)
    const q = query(collection(db, "menuItems"), where("__name__", "==", name));
    await getDocs(q).then((querySnapshot) => {
      console.log("querySnapshot", querySnapshot)
      const item = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log("item", item)
      setFoodItem(item[0])
      setLoader(false)
    })
  }

  const deleteItem = async (id) => {
    console.log("id", id)
    setLoader(true)
    await deleteDoc(doc(db, "menuItems", id)).then(() => {
      loadFoodItems().then(() => {
        setLoader(false);
      });
    });
  }


  return (
    <div className='position-relative pb-3'>
      {loader && <Loader />}
      <div className='col-lg-12  d-flex flex-wrap position-relative'>
        <div className="col-lg-3 col-12 bg-white shadow-sm p-3 h-max" style={{ position: "sticky", top: "0px" }}>
          <div className='d-flex justify-content-between align-items-center'>
            <h4>Categories</h4>
          </div>
          <hr />
          <div className="mt-3" id="collapseExample">
            <form onSubmit={(e) => {
              e.preventDefault();
              saveCategory();
            }}>
              <div className="input-group mb-3">
                <input type="text" className="form-control" id="categoryName" placeholder='Enter Category Name' value={categpryName} onChange={(e) => setCategoryName(e.target.value)} />
                <button className="btn btn-sm btn-outline-primary" type="submit">
                  <FontAwesomeIcon icon={faAdd} className="me-2" />
                  Add
                </button>
              </div>
            </form>
          </div>
          <ul className="list-group overflow-auto" style={{ height: "25rem" }}>
            {categoryList && categoryList.map((category) => (
              <li key={category.id} className="list-group-item d-flex justify-content-between">
                {category.name}
                <button type="button" className="btn btn-sm text-danger" onClick={() => deleteCategory(category.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-9 col-12 d-flex flex-column bg-white shadow-sm p-3" style={{ zIndex: "1000" }}>
          <div className='d-flex flex justify-content-between align-items-center'>
            <div className='d-flex d-lg-flex align-items-center flex-column flex-lg-row'>
              <h4 className='w-100'>Food Items</h4>
            </div>

            <button id="staticBackdropBtn" type="button" className="btn btn-sm btn-outline-primary h-max" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
              <FontAwesomeIcon icon={faAdd} className="me-2" />
              Add
            </button>
          </div>
          <select
            className="form-select mt-2 w-100"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              loadFoodItems(e.target.value);
            }}
          >
            <option value="">All</option>
            {categoryList && categoryList.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <hr />
          {items && items.length === 0 && <NoData />}
          <ul className='food-list-container p-0 m-0'>
            {items && items.map((item, index) => (
              <li key={index} className="list-group-item p-0">
                <div className="card border">
                  <img src={item.image} className="card-img-top" alt="..." width="50" height="200" />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className="d-flex justify-content-end">
                      <button type="button" className="btn btn-sm btn-outline-primary me-2" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onClick={() => EditItem(item.id)}>
                        <FontAwesomeIcon icon={faEdit} className="me-2" />
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} className="me-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}

          </ul>
        </div>
      </div>

      <div className="offcanvas offcanvas-end" style={{ "--bs-offcanvas-width": "550px" }} data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">{modalMode} Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={(e) => {
            e.preventDefault();
            saveData();
          }}>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                value={foodItem.category}
                onChange={(e) => setFoodItem({ ...foodItem, category: e.target.value })}
                required>
                <option value="">Select a category</option>
                {categoryList && categoryList.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="foodName" className="form-label">Food Name</label>
              <input
                type="text"
                className="form-control"
                id="foodName"
                placeholder='Enter food name'
                value={foodItem.name}
                onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder='Enter description'
                value={foodItem.description}
                onChange={(e) => setFoodItem({ ...foodItem, description: e.target.value })}
                required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <small className='text-muted mb-2'> (Image size should be less than 1MB. Only .png, .jpg, .jpeg allowed)</small>
              <input
                type="file"
                id="foodImage"
                name="foodImage"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">{modalMode} Menu</button>
              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </form>
        </div>
      </div>


    </div>
  )
}

export default MenuList
