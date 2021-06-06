import React from 'react'
import {Navbar,Nav,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import img from '../img/2.PNG'

const Navigation = () => {
    return (
        <div id="responsiveNav">
            <Navbar  expand="md" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-auto"/>
            <Navbar.Brand as={Link}>
                NEUBEumates Dashboard
          </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav className="flex-column">
                        <Nav.Link as={Link} className="link">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/addnotice" className="link">Add Notice</Nav.Link>
                        <Nav.Link as={Link} to="/addclassroutine" className="link">Class Routine</Nav.Link>
                        <Nav.Link as={Link} to="/addbook" className="link">Add Book</Nav.Link>
                        <Nav.Link as={Link} to="/result" className="link">Result</Nav.Link>
                        <Nav.Link as={Link} to="/signin" className="link">Logout</Nav.Link>
                                             
                    </Nav> 
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation
