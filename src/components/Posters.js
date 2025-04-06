import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebaseConfig';

import Loader from './Loader';
import NoData from './NoData';

var $ = require('jquery');

function Posters() {

  const [loader, setLoader] = useState(true);
  const [poster, setPoster] = useState({
    name: "",
    image: ""
  });
  const [items, setItems] = useState([]);  // List of items under the category

  useEffect(() => {
    loadPosters()
  }, []);

  const saveData = async () => {
    setLoader(true)

    if (!poster.image) {
      alert("Please upload an image");
      setLoader(false);
      return;
    }

    setPoster({
      name: poster.name,
      image: poster.image
    });

    console.log("poster", poster)

    await addDoc(collection(db, "posters"), poster).then(() => {
      loadPosters()
      $('#staticBackdropBtn').click();
      setPoster({
        name: "",
        image: ""
      })
      setLoader(false)
    })
  };

  const loadPosters = async () => {
    await getDocs(collection(db, "posters")).then((querySnapshot) => {
      console.log("querySnapshot", querySnapshot.docs)
      const posterList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log("posterList", posterList)
      setItems(posterList)
      setLoader(false)
    })
  }

  const handleFileChange = async (e) => {
    setLoader(true)
    const file = e.target.files[0];
    if (file.size > 1024 * 1024) { // 1MB in bytes
      alert("Image size should be less than 1MB");
      setLoader(false);
      return;
    }
    await convertToBase64(file).then((base64) => {
      setPoster({ ...poster, image: base64 });
      setLoader(false);
    });
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const deleteItem = async (id) => {
    console.log("id", id)
    setLoader(true)
    await deleteDoc(doc(db, "posters", id)).then(() => {
      loadPosters().then(() => {
        setLoader(false);
      });
    });
  }

  return (
    <div className='position-relative'>
      {loader && <Loader />}
      {/* <h2>Posters</h2> */}
      <div className='col-lg-12  d-flex flex-wrap position-relative'>
        <div className="col-12 bg-white shadow-sm p-3" style={{ zIndex: "1000" }}>
          <div className='d-flex flex justify-content-between align-items-center'>
            <div className='d-flex d-lg-flex align-items-center flex-column flex-lg-row'>
              <h4 className='w-100'>Posters</h4>
            </div>

            <button id="staticBackdropBtn" type="button" className="btn btn-sm btn-outline-primary h-max" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
              <FontAwesomeIcon icon={faAdd} className="me-2" />
              Add
            </button>
          </div>
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
          <h5 className="offcanvas-title" id="staticBackdropLabel">Add Poster</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={(e) => {
            e.preventDefault();
            saveData();
          }}>
            <div className="mb-3">
              <label htmlFor="posterName" className="form-label">Poster Name</label>
              <input
                type="text"
                className="form-control"
                id="posterName"
                placeholder='Enter poster name'
                value={poster.name}
                onChange={(e) => setPoster({ ...poster, name: e.target.value })}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <small className='text-muted mb-2'> (Image size should be less than 1MB. Only .png, .jpg, .jpeg allowed)</small>
              <input
                type="file"
                id="posterImage"
                name="posterImage"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">Add Poster</button>
              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Posters
