import React from 'react' 
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import Navigation from './Navigation';
import Addbook from './Addbook';
import Addnotice from './Addnotice';
import Adduser from './Adduser';
import Result from './Result';
import Classroutine from './Classroutine';
import Allinfo from './Allinfo';
import {Container,Row,Col,Image,Nav} from 'react-bootstrap'
import img from '../img/2.PNG'


const Routing=()=>{
  return(
     <Switch>
        <Route exact path="/" component={Allinfo}/>
        <Route path="/adduser" component={Adduser}/>
        <Route path="/addnotice" component={Addnotice}/>
        <Route path="/addclassroutine" component={Classroutine}/>
        <Route path="/result" component={Result}/>
        <Route path="/addbook" component={Addbook}/>
     </Switch>
  );
}

function Home() {
  return (
    <div>
      <Container fluid>
        <Row>
        <div id="admin">
            <h4>Muyabbaj, Welcome to Dashboard</h4>
            <Image src={img} roundedCircle 
            className="adminPic"
            />
          </div>
          <BrowserRouter>
          <Navigation/>
          <Col md={2} id="leftSide">           
                    <div className="adminHeader">
                      <Link to="/" style={{color:"white"}}><h4>Dashboard</h4></Link>
                    </div>
                    <Nav className="flex-column">
                        
                         <Nav.Link as={Link} to="/adduser" className="link">  <i className="material-icons">person_add</i>Classes Access</Nav.Link>
                        <Nav.Link as={Link} to="/addnotice" className="link">  <i className="material-icons">event_note</i> Add Notice</Nav.Link>
                        <Nav.Link as={Link} to="/addclassroutine" className="link">  <i className="material-icons">add_to_photos</i> Class Routine</Nav.Link>
                        <Nav.Link as={Link} to="/addbook" className="link">  <i className="material-icons">add_box</i> Add Book</Nav.Link>
                        <Nav.Link as={Link} to="/result" className="link">  <i className="material-icons">send</i> Result</Nav.Link>
                        <Nav.Link as={Link} to="/logout" className="link">  <i className="material-icons">done_all</i> Logout</Nav.Link>
                       
                    </Nav>                    
                    
          </Col>
          <Col md={10} className="rightSide"><Routing/></Col>
          </BrowserRouter>
     </Row>
     </Container>
    </div>
  );
}

export default Home;
