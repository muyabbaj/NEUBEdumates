import React, { useContext, useState } from 'react';
import { ListGroup, Modal, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const Navigationbar = () => {
    const history=useHistory()
    const [search,setSearch]=useState("");
    const [userDetails,setUserDetails] = useState([]);
    const {state,dispatch}=useContext(UserContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const fetchUsers = (query)=>{
      setSearch(query)
      fetch('/search-users',{
        method:"post",
        headers:{
          "Content-Type":"application/json",

        },
        body:JSON.stringify({
          query
        })
      }).then(res=>res.json())
      .then(results=>{
        // console.log(results)
        setUserDetails(results.user)
      })
   }

    return (
        <div>          
            <nav>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to={state? "/":"/signin"} className="link">NEUBEdumates</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                
                {
                    state?  <Nav className="ml-auto ">
                    <Nav.Link  onClick={handleShow} className="link">
                      <i className="material-icons">search</i>
                    </Nav.Link>
          
                    <Nav.Link as={Link} to="/" className="link">Home</Nav.Link>
                    <Nav.Link as={Link} to="/createpost" className="link">Create Post</Nav.Link>
                    <Nav.Link as={Link} to="/myfollowinguser" className="link">My Following</Nav.Link>
                    <Nav.Link as={Link} to="/profile" className="link">{state? state.name:"Loading..."}</Nav.Link>
                    <Nav.Link as={Link} to="/signin" style={{color:"red"}} onClick={()=>{
                     localStorage.clear()
                     dispatch({type:"CLEAR"})
                     //history.push('/signin')
                    }}>Logout</Nav.Link>
                   
                  </Nav>
                  :
                  <Nav className="ml-auto" bg="dark" variant="dark">
                    <Nav.Link as={Link} to="/signup" className="link">Signup</Nav.Link>
                    <Nav.Link as={Link} to="/signin" className="link">Signin</Nav.Link>
                   
                  </Nav>

                }         
                </Navbar.Collapse>
                </Navbar>              
             </nav>
            

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <h4>Search Specific User</h4>
              </Modal.Header>
              <Modal.Body >
                <div>
                  <input type="text" placeholder="search"
                  value={search}
                  onChange={e=>fetchUsers(e.target.value)}
                  />
                </div>
                <div style={{height:"300px",overflow:"auto"}}>
                <ListGroup>
                  {
                  userDetails.map(item=>{
                  return( 
                  <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'}
                  onClick={()=>{ 
                    setSearch(" ")
                    setUserDetails([])
                    setShow(false)
                  }}
                  > 

                  <ListGroup.Item>{item.name}</ListGroup.Item></Link> 
                  )
                  })
                  }
                    
              </ListGroup>
                </div>

              </Modal.Body>
            </Modal>
  
        </div>
    )
}

export default Navigationbar
