import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";


const CreatStudentComponent = () => {
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const students = [
        { id: 1, name: 'John Doe', rollNumber: '12345', group: 'FT SD E3' },
        { id: 2, name: 'Jane Doe', rollNumber: '12346', group: 'FT SD E3' },
        { id: 3, name: 'John Smith', rollNumber: '12347', group: 'FT SD E3' },
        { id: 4, name: 'Jane Smith', rollNumber: '12348', group: 'FT SD E3' },
        { id: 5, name: 'John Doe', rollNumber: '12345', group: 'FT SD E3' },
        { id: 6, name: 'Jane Doe', rollNumber: '12346', group: 'FT SD E3' },
        { id: 7, name: 'John Smith', rollNumber: '12347', group: 'FT SD E3' },
        // Add more student objects here
    ];


    const [studentName, setStudentName] = useState("");
    const [studentRollNumber, setStudentRollNumber] = useState("");

    // Click and modal handlers
    const handleClick = () => setClick(!click);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Form submission handler
    const handleStudentSubmit = (e) => {
        e.preventDefault();
        // Handle student submission logic here
        console.log("Student submitted:", studentName, studentRollNumber);
        // Add logic to send data to backend or perform necessary actions
        handleClose(); // Close the modal after submission
    };
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
                   
               `}
            </style>
            <div className='App'>
                <nav className="navbar">
                    <div className="nav-container">
                        {/* Logo and Home link */}
                        <NavLink exact to="/" className="nav-logo">
                            <NavLink exact to="/LibrarianHomepage" className="nav-logo">
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
                                    to="/LibrarianHomepage"
                                    activeclassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/CreateTeacher"
                                    activeclassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Manage Teachers
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/CreateStudents"
                                    activeclassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Manage Students
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/ManageStudentGroup"
                                    activeclassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Manage Students Group
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/ManagementGroups"
                                    activeclassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Manage Groups
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/Resetpassword"
                                    activeclassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Reset Password
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink

                                    to="/LoginLibrarian"
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
                                    <form className="form-inline">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search Teacher" aria-label="Search" />
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Students Details</b></h2></div>
                            <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
                                <Button variant="primary" onClick={handleShow}>
                                    Add New Students
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row">
                                <div className="table-responsive" style={{ fontFamily: 'Allerta Stencil', maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                                    <Table striped bordered hover responsive className="mt-4 text-center" style={{ minWidth: '600px' }}>
                                        <thead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Name</th>
                                                <th>Roll Number</th>
                                                <th>Assign Group</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((student) => (
                                                <tr key={student.id}>
                                                    <td>{student.id}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.rollNumber}</td>
                                                    <td>
                                                        <Form.Select>
                                                            <option>Choose group...</option>
                                                            {/* Add options dynamically based on your data or static values */}
                                                            <option value="FT SD E3">FT-SD-E3</option>
                                                            <option value="FT SD M2">FT-SD-M2</option>
                                                        </Form.Select>
                                                    </td>
                                                    <td>
                                                        <Button variant="success" className="me-2">
                                                            Add
                                                        </Button>
                                                        <Button variant="primary" className="me-2">
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
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            {/* Modal Box for adding new teacher */}
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                dialogClassName="modal-90w"
                                style={{ fontFamily: 'Allerta Stencil' }}
                            >
                                <Modal.Header closeButton style={{ background: "#33b5e5" }}>
                                    <Modal.Title>Add Student</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ background: "#e3f2fd" }}>
                                    <Container>
                                        <Row>
                                            <Col sm={6}>
                                                {/* Form for adding new student */}
                                                <form onSubmit={handleStudentSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="studentName">Name:</label>
                                                        <input type="text" className="form-control" id="studentName" placeholder="Enter Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="studentRollNumber">Roll Number:</label>
                                                        <input type="text" className="form-control" id="studentRollNumber" placeholder="Enter Roll Number" value={studentRollNumber} onChange={(e) => setStudentRollNumber(e.target.value)} required />
                                                    </div>
                                                    <button type="submit" className="btn btn-success mt-4">
                                                        Add Student
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
        </div>


    );
}

export default CreatStudentComponent;
