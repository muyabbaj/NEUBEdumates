import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const ClassUpdate = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title,setTitle]=useState("");
    const [courseCode,setCourseCode]=useState("");
    const [section,setSection]=useState("");
    const [semester,setSemester]=useState("");
    const [classes,setClasses]=useState([]);

    const {deptName}=useParams()
    //console.log(deptName)
   
    const sortData=classes.map((item,index)=>{  
        return classes[classes.length-1-index];
     });
     
     useEffect(()=>{
         fetch(`/showclasses/${deptName}`,{
             headers:{
                 "Authorization":"Bearer "+localStorage.getItem('jwt')
             }
         })
         .then(res=>res.json())
         .then(classes=>{
            //console.log(classes)
             setClasses(classes)
         })
         .catch(e=>console.log(e))
     },[]);

    
    
    const createClass=()=>{
        fetch("/createclass",{
            method:"POST",
            headers:{
               "Content-Type":"application/json",
               "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                courseCode,
                section,
                semester,
                deptName
            })
        }).then(res=>res.json())
        .then(data=>{
            
            if (data.error){
                toast.warning(data.error)
                setShow(true);
            }else{
                toast.success("Successfully created class")
                classes.push(data)
                setTitle("")
                setCourseCode("")
                setSection("")
                setSemester("")
                setShow(false);
            }
        })
        .catch(e=>console.log(e))
    }
    return (
        <div>
            <Container fluid>
               <div className="createClassBtn">
                    <Button variant="success"  onClick={handleShow}>
                    <i className="material-icons">add_circle</i> <span>Crate a Class</span>
                    </Button>
               </div>
        
                <Modal show={show} onHide={handleClose} className="customModalSize">
                    <Modal.Header closeButton>
                    <Modal.Title>Create a Class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <input type="text" placeholder="Course Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                    <input type="text" placeholder="Course Code" value={courseCode} onChange={e=>setCourseCode(e.target.value)}/>
                    <input type="text" placeholder="Section" value={section} onChange={e=>setSection(e.target.value)}/>
                    <input type="text" placeholder="Semester" value={semester} onChange={e=>setSemester(e.target.value)}/>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={()=>createClass()}>
                        Create
                    </Button>
                    </Modal.Footer>
                </Modal>
   
                <Row className="createdClassCSS">
                    
                        
                        { sortData.map((item)=>{
                            return(
                                <Col md={4} lg={3} key={item._id} >
                                <Card className="classRoomCard">
                                <div >
                                <div className="classRoomHeader">
                                    <div>
                                        <Image src={item.createdBy.pic} roundedCircle 
                                        className="headerImg"
                                        />
                                    </div>
                                    <div className="teacherName">
                                        <h5 >{item.createdBy.name}</h5>
                                    </div>
                                </div>
                                <hr/>
                                <div className="createdClassContent">
                                    <h2><Link to={`/course/${item._id}` }>{item.title} </Link></h2>
                                    <p>Course Code: {item.courseCode}</p>
                                    <p>Section: {item.section}</p>
                                    <p>Semester: {item.semester}</p>
                                </div>
                                </div>
                                </Card>
                                </Col>
                                )
                            })                   
                            }             
                    </Row>
            </Container>
        </div>
    )
}

export default ClassUpdate
