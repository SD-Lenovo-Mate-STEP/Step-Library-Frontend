import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Button, Table, Modal, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";

const ManageGroupComponent = () => {
  const loginedData = JSON.parse(localStorage.getItem('user_logined'));
  const token = loginedData.token;
  const [show, setShow] = useState(false);
  const [teacherGroups, setTeacherGroups] = useState([
    { id: 1, name: 'FT-SD-A3', numberOfStudents: 25 },
    // Add more default groups as needed
  ]); // Placeholder data for teacher's groups

  const [filterValue, setFilterValue] = useState('');
  // Function to handle modal close
  const handleClose = () => setShow(false);

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  function loadGroups(){
    try{
        fetch(`https://localhost:44343/api/Groups`,{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
          }).then((resp) => resp.json()).then((data) => {
            console.log(data);
          })
    }catch(err){

    }
  } 
  return (
    <div className='App'>
      <style>
        {`
  
                  body {
                      background-color: #e3f2fd;
                      font-family: 'Allerta Stencil', sans-serif;
                      
                  }
                   .navbar {
                      background-color: #1f5156;
                      height: 100px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 1.2rem;
                      position: sticky;
                      top: 0;
                      z-index: 20;
                    }
                    
                    .nav-container {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100%;
                      height: 80px;
                      max-width: 1500px;
                      position: relative;
                    }
                    
                    .nav-logo {
                      color: #f5b921;
                      align-items: center;
                      margin-left: 20px;
                      cursor: pointer;
                      text-decoration: none;
                      font-size: 2rem;
                      flex-grow: 1;
                    
                      display: flex;
                      align-items: center;
                      justify-items: center;
                    }
                    
                    .nav-logo .icon {
                      display: inline-block;
                      width: 3rem;
                      height: 3rem;
                      margin-left: 16px;
                    }
                    
                    .nav-menu {
                      display: flex;
                      list-style: none;
                      text-align: center;
                      margin-right: 2rem;
                      width: 100%;
                      justify-content: space-evenly;
                       margin-top: 30px;
                    }
                    
                    .nav-links {
                      color: #fff;
                      text-decoration: none;
                      padding: 0.5rem 1rem;
                      height: 100%;
                      border-bottom: 3px solid transparent;
                    }
                    /* .fa-code {
                      margin-left: 1rem;
                    } */
                    
                    .nav-item {
                      line-height: 40px;
                      margin-right: 1rem;
                    }
                    
                    .nav-item:after {
                      content: "";
                      display: block;
                      height: 3px;
                      width: 0;
                      background: transparent;
                      transition: width 0.7s ease, background-color 0.5s ease;
                    }
                    
                    .nav-item:hover:after {
                      width: 100%;
                      background: #ffdd40;
                    }
                    
                    .nav-item .active {
                      color: #ffdd40;
                      border: 1px solid #ffdd40;
                    }
                    
                    .nav-icon {
                      display: none;
                      color: #f5b921;
                    }
                    
                    .nav-icon .icon {
                      display: inline-block;
                      width: 2rem;
                      height: 2rem;
                    }
                    
                    @media screen and (max-width: 960px) {
                      .nav-menu {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        border-top: 1pxsolid #fff;
                        position: absolute;
                        top: 80px;
                        left: -110%;
                        opacity: 1;
                        transition: all 0.5s ease;
                      }
                    
                      .nav-menu.active {
                        background: #1f5156;
                        left: 0px;
                        opacity: 1;
                        transition: all 0.5s ease;
                        z-index: 1;
                      }
                      .nav-item .active {
                        color: #ffdd40;
                        border: none;
                      }
                      .nav-links {
                        padding: 1.5rem;
                        width: 100%;
                        display: table;
                      }
                    
                      .nav-logo .icon {
                        width: 2rem;
                        height: 2rem;
                      }
                    
                      .nav-icon {
                        display: block;
                        position: absolute;
                        top: 50%;
                        right: 0;
                        transform: translate(-100%, -50%);
                        width: 2rem;
                        height: 2rem;
                        cursor: pointer;
                        color: #ffdd40;
                      }
                    }
  
                    .fade-in {
                      animation: fadeIn 1s ease-in-out;
                  }
  
                  @keyframes fadeIn {
                      from {
                          opacity: 0;
                      }
                      to {
                          opacity: 1;
                      }
                  }
  
               
                      .dashboard-content {
                          background-color: #fff;
                          padding: 20px;
                          border-radius: 10px;
                          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                          width: 80%;
                          margin: 0 auto;
                          margin-top: 50px;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          justify-content: center;
                          text-align: center;
                      }
                      .dashboard-content img {
                          max-width: 100%;
                          height: auto;
                      }
               `}
      </style>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo and Home link */}
          <NavLink exact to="/" className="nav-logo">
            <NavLink exact to="/Homepage" className="nav-logo">
              <img
                src="https://fsx1.itstep.org/api/v1/files/-bRZCFuPESE9skZZlyP75n4dL9uFnEpm"
                alt="logo"
                width="50"
                style={{
                  padding: '1px',
                  marginTop: '10px',
                  width: '100px',
                  height: '220px',
                }}
              />
            </NavLink>


          </NavLink>

          {/* Navigation links */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/Homepage"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Homepage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/UploadBook"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Upload Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ViewGroups"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                View Groups
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/EbookManagement"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Assign Ebooks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink

                to="/LoginTeacher"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}

              >
                Log out
              </NavLink>
            </li>
            {/* Add more navigation items as needed */}
          </ul>

          {/* Hamburger icon for mobile */}
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row">
            <div className="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                {/* Replaced text input with dropdown for group name filter */}
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  {/* Add a default disabled option without value */}
                  <option value="" disabled hidden>
                    Filter by Group Name
                  </option>
                  {/* Add options dynamically based on group names */}
                  {teacherGroups.map((group) => (
                    <option key={group.id} value={group.name}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: 'green' }}>
              <h2>
                <b>Groups Details</b>
              </h2>
            </div>
            {/* Removed "Add New Group" button */}
          </div>
          <div className="row">
            <div className="table-responsive" style={{ fontFamily: 'Allerta Stencil', maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
              <Table striped bordered hover responsive className="mt-4 text-center" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>Group ID</th>
                    <th>Group Name</th>
                    <th>Number of Students</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through the teacherGroups state and display each group */}
                  {teacherGroups.map((group) => (
                    <tr key={group.id}>
                      <td>{group.id}</td>
                      <td>{group.name}</td>
                      <td>{group.numberOfStudents}</td>
                      <td>
                        {/* Replaced "View" link with a button */}
                        <Button variant="info" className="me-2" onClick={loadGroups}>
                          View
                        </Button>
                        <Link to={`/editGroup/${group.id}`}>
                          {/* "Edit" link remains as a button */}
                          {/* <Button variant="success" className="ms-2">
                                                        Edit
                                                    </Button> */}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          {/* Modal Box */}
          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              style={{ marginTop: '90px', fontFamily: 'Allerta Stencil', width: '100%', height: '100%' }}
            >
              <Modal.Header closeButton style={{ background: '#33b5e5' }}>
                <Modal.Title>Add Group</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: '#e3f2fd' }}>
                {/* Form for adding a new group */}
                <form>
                  <div className="form-group">
                    <label htmlFor="groupName">Group Name:</label>
                    <input type="text" className="form-control" id="groupName" placeholder="Enter Group Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="numberOfStudents">Number of Students:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="numberOfStudents"
                      placeholder="Enter Number of Students"
                    />
                  </div>
                  <button type="submit" className="btn btn-success mt-4">
                    Add Group
                  </button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGroupComponent;
