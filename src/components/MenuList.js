import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

function MenuList() {

  return (
    <div className='overflow-auto'>
      <h2>Menu List</h2>
      <div className='col-lg-12  d-flex flex-wrap'>
        <div className="col-lg-3 col-12 bg-white shadow-sm p-3">
          <div className='d-flex justify-content-between'>
            <h4>Categories</h4>
            <button type="button" className="btn btn-sm btn-outline-primary">
              <FontAwesomeIcon icon={faAdd} className="me-2" />
              Add Category
            </button>
          </div>
          <hr />
          <ul className="list-group">
            <li className="list-group-item">Category 1</li>
            <li className="list-group-item">Category 2</li>
            <li className="list-group-item">Category 3</li>
          </ul>
        </div>
        <div className="col-lg-9 col-12 bg-white shadow-sm p-3">
          <div className='d-flex flex justify-content-between align-items-center'>
            <div className='d-flex d-lg-flex align-items-center flex-column flex-lg-row'>
              <h4 className='me-3 w-100'>Food Items</h4>
              <select className="form-select me-2">
                <option value="">Select a Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div>

            <button type="button" className="btn btn-sm btn-outline-primary h-max">
              <FontAwesomeIcon icon={faAdd} className="me-2" />
              Add Food
            </button>
          </div>
          <hr />
          <ul className='food-list-container p-0 m-0'>
            <li className="list-group-item p-0">
              <div className="card border-0">
                <img src="https://picsum.photos/50/50" className="card-img-top" alt="..." width="50" height="200" />
                <div className="card-body">
                  <h5 className="card-title">Food Item 1</h5>
                  <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-outline-primary me-2">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger">
                      <FontAwesomeIcon icon={faTrash} className="me-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>

            <li className="list-group-item p-0">
              <div className="card border-0">
                <img src="https://picsum.photos/50/50" className="card-img-top" alt="..." width="50" height="200" />
                <div className="card-body">
                  <h5 className="card-title">Food Item 1</h5>
                  <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-outline-primary me-2">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger">
                      <FontAwesomeIcon icon={faTrash} className="me-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>

            <li className="list-group-item p-0">
              <div className="card border-0">
                <img src="https://picsum.photos/50/50" className="card-img-top" alt="..." width="50" height="200" />
                <div className="card-body">
                  <h5 className="card-title">Food Item 1</h5>
                  <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-outline-primary me-2">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger">
                      <FontAwesomeIcon icon={faTrash} className="me-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default MenuList
