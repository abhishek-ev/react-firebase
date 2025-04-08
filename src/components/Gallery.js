import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons'

import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import db from '../firebaseConfig'

import Loader from './Loader'
import NoData from './NoData'

var $ = require('jquery');

function Gallery() {

  const [loader, setLoader] = useState(true);
  const [video, setVideo] = useState({
    name: "",
    embeded: "",
    url: ""
  });
  const [items, setItems] = useState([]);  // List of items under the category

  useEffect(() => {
    loadPosters()
  }, []);

  const saveData = async () => {
    setLoader(true)

    setVideo({
      name: video.name,
      url: video.url
    });

    console.log("video", video)

    await addDoc(collection(db, "gallery"), video).then(() => {
      loadPosters()
      $('#staticBackdropBtn').click();
      setVideo({
        name: "",
        embeded: "",
        url: ""
      })
      setLoader(false)
    })
  };

  const loadPosters = async () => {
    await getDocs(collection(db, "gallery")).then((querySnapshot) => {
      console.log("querySnapshot", querySnapshot.docs)
      const posterList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log("posterList", posterList)
      setItems(posterList)
      setLoader(false)
    })
  }

  const deleteItem = async (id) => {
    console.log("id", id)
    setLoader(true)
    await deleteDoc(doc(db, "gallery", id)).then(() => {
      loadPosters().then(() => {
        setLoader(false);
      });
    });
  }

  const extractSrcUrl = (iframeHtml) => {
    if (!iframeHtml) {
      return '';
    }
    const iframe = document.createElement('div');
    iframe.innerHTML = iframeHtml;
    if (iframe.querySelector('iframe')) {
      const srcUrl = iframe.querySelector('iframe').getAttribute('src');
      return srcUrl;
    }
    return ""
  }

  return (
    <div className='position-relative'>
      {loader && <Loader />}
      {/* <h2>Posters</h2> */}
      <div className='col-lg-12  d-flex flex-wrap position-relative'>
        <div className="col-12 bg-white shadow-sm p-3" style={{ zIndex: "1000" }}>
          <div className='d-flex flex justify-content-between align-items-center'>
            <div className='d-flex d-lg-flex align-items-center flex-column flex-lg-row'>
              <h4 className='w-100'>YouTube Videos</h4>
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
                  <iframe width="100%" height="400" src={item.url} title="Embed a YouTube video in HTML | HTML Basics | Frontend #shorts #shortvideo #html #css #coding #web" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

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
          <h5 className="offcanvas-title" id="staticBackdropLabel">Add YouTube Video</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={(e) => {
            e.preventDefault();
            saveData();
          }}>
            <div className="mb-3">
              <label htmlFor="videoName" className="form-label">Video Name</label>
              <input
                type="text"
                className="form-control"
                id="videoName"
                placeholder='Enter video name'
                value={video.name}
                onChange={(e) => setVideo({ ...video, name: e.target.value })}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">Embeded code</label>
              <textarea
                type="text"
                className="form-control"
                id="embebedCode"
                rows={5}
                placeholder='Paste embeded code'
                value={video.embeded}
                onChange={(e) => setVideo({ ...video, embeded: e.target.value, url: extractSrcUrl(e.target.value) })}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">Url</label>
              <input
                type="text"
                className="form-control"
                id="url"
                placeholder='Video Url'
                value={video.url}
                onChange={(e) => setVideo({ ...video, url: e.target.value })}
                required />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">Add Video</button>
              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Gallery
