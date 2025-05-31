import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListDots, faImage, faVideo, faImages } from '@fortawesome/free-solid-svg-icons';


function Sidebar() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");
    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    }
  }, []);



  return (
    <div className='sidebar-container d-flex flex-column'>
      <NavLink
        to="menulist"
        className='sidebar-icon p-3'
      >
        <FontAwesomeIcon icon={faListDots} fontSize={20} />
      </NavLink>
      <NavLink
        to="posters"
        className='sidebar-icon p-3'
      >
        <FontAwesomeIcon icon={faImages} fontSize={20} />
      </NavLink>
      <NavLink
        to="gallery"
        className='sidebar-icon p-3'
      >
        <FontAwesomeIcon icon={faVideo} fontSize={20} />
      </NavLink>

      <NavLink
        to="offers"
        className='sidebar-icon p-3'
      >
        <FontAwesomeIcon icon={faImage} fontSize={20} />
      </NavLink>
    </div>
  )
}

export default Sidebar
