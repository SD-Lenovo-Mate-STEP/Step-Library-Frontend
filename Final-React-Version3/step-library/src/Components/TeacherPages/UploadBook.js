import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";


const UploadBookComponent = () => {
  const loginedData = JSON.parse(localStorage.getItem('user_logined'));
  const token = loginedData.token;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bookCoverPreview, setBookCoverPreview] = useState(null);

  const previewBookCover = (event) => {
    const input = event.target;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      setBookCoverPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setBookCoverPreview(null);
    }
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  function loadBooks(){
    try{
      fetch(`https://localhost:44343/api/Books`,{
          method: 'GET',
          headers: {
              Authorization : `Bearer ${token}`
          }
        }).then((resp) => resp.json()).then((data) => {
          console.log(data);
          return data;
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
      <div class="container ">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div class="row ">

            <div class="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search Book" aria-label="Search" />

                </form>
              </div>
            </div>
            <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Books Details</b></h2></div>
            <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add New Book
              </Button>
            </div>
          </div>
          <div class="row">
            <div className="table-responsive" style={{ fontFamily: 'Allerta Stencil', maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
              <Table striped bordered hover responsive className="mt-4 text-center" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Book Title</th>
                    <th>Book Author</th>
                    <th>Book Cover</th>
                    <th>Book Path</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace this sample row with dynamic data */}
                  <tr>
                    <td>1</td>
                    <td>Book 1</td>
                    <td>Yeow</td>
                    <td>
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/I/611X8GI7hpL._AC_UL127_SR127,127_.jpg"
                        alt="Book 1 Cover"
                        style={{ maxWidth: '50px', maxHeight: '50px' }}
                      />
                    </td>
                    <td>/path/to/book1</td>
                    <td>
                      <Button variant="info" className="me-2" onClick={loadBooks}>
                        View
                      </Button>
                      <Button variant="danger">
                        Delete
                      </Button>
                      <Button variant="success" className="ms-2">
                        Edit
                      </Button>
                    </td>
                  </tr>
                  {/* Add more rows based on your actual data */}
                </tbody>
              </Table>
            </div>
          </div>

          {/* <!--- Model Box ---> */}
          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              style={{ marginTop: '90px', fontFamily: 'Allerta Stencil', width: '100%', height: '100%' }}
            >
              <Modal.Header closeButton style={{ background: "#33b5e5" }}>
                <Modal.Title>Add Record</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: "#e3f2fd" }}>
                <Container>
                  <Row>
                    <Col sm={6} className="text-center">
                      <div style={{ border: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {bookCoverPreview ? (
                          <img
                            id="bookCoverPreview"
                            src={bookCoverPreview}
                            className="mt-2"
                            style={{ maxWidth: '200px', maxHeight: '250px', width: 'auto', height: 'auto' }}
                            alt="Book Cover Preview"
                          />


                        ) : (
                          <div>
                            <i className="bi bi-image" style={{ fontSize: '50px', color: '#ddd' }}></i>
                            <p style={{ margin: '10px 0', color: '#aaa' }}>No Image</p>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <form>
                        <div className="form-group">
                          <label htmlFor="bookCover">Book Cover:</label>
                          <input type="file" accept="image/*" className="form-control" id="bookCover" onChange={(e) => previewBookCover(e)} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="bookTitle">Book Title:</label>
                          <input type="text" className="form-control" id="bookTitle" placeholder="Enter Book Title" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="bookAuthor">Book Author:</label>
                          <input type="text" className="form-control" id="bookAuthor" placeholder="Enter Author Name" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="bookPage">Book Pages:</label>
                          <input type="text" className="form-control" id="bookPage" placeholder="Enter Book Page" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="bookPath">Book Path (PDF):</label>
                          <input type="file" accept=".pdf" className="form-control" id="bookPath" />
                        </div>
                        <button type="button" className="btn btn-success mt-4">
                          Add Record
                        </button>
                      </form>
                    </Col>
                  </Row>
                </Container>
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
}

export default UploadBookComponent;