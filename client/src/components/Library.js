import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Library = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [bookName,setBookName]=useState("");
    const [authorName,setAuthoreName]=useState("");
    const [publisher,setPublisher]=useState("");
    const [edition,setEdition]=useState("");
    const [department,setDepartment]=useState("CSE");
    // const [bookLink,setBookLink]=useState("");
    const [pic,setPic]=useState("")
    
    const [url,setUrl]=useState("")

    useEffect(()=>{
        fetch('/postbook',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body:JSON.stringify({
                bookName,
                authorName,
                publisher,
                edition,
                department,
                bookLink:url
            })
        }).then(res=>res.json())
        .then(data=>{
            //console.log(data)
            if(data.error){
                //toast.warning(data.error);
            }else{
                handleClose(false)
            }
        })
        .catch(e=>console.log(e))
    },[url])
    
    const UploadBook=()=>{
        const data =new FormData()
        // console.log(data)
        data.append("file",pic)
        data.append("upload_preset","neubmates")
        data.append("cloud_name","muyabbaj")
        // console.log(data)

        fetch("https://api.cloudinary.com/v1_1/muyabbaj/image/upload",{
            method:"Post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            // console.log(url)
            setUrl(data.url) 
        })
        .catch(e=>console.log(e))

        
    }

    return (   
        <div>
            <Container fluid>
               <div className="createClassBtn">
                    <Button style={{backgroundColor:"311B92",marginBottom:"10px"}}  onClick={handleShow}>
                    <i className="material-icons">attach_file</i> <span>Upload Book</span>
                    </Button>
               </div>
        
                <Modal show={show} onHide={handleClose} className="customModalSize">
                    <Modal.Header closeButton>
                    <Modal.Title>E-Library</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <input type="text" placeholder="Book Name" value={bookName} onChange={(e)=>setBookName(e.target.value)}/>
                    <input type="text" placeholder="Authore Name" value={authorName} onChange={(e)=>setAuthoreName(e.target.value)}/>
                    <input type="text" placeholder="(Optional) Publisher" value={publisher} onChange={(e)=>setPublisher(e.target.value)}/>
                    <input type="text" placeholder="(Optional) Edition" value={edition} onChange={(e)=>setEdition(e.target.value)}/>
                    <select onChange={e=>setDepartment(e.target.value)}>
                        <option value="CSE" key="1">CSE</option>
                        <option value="BBA" key="2">BBA</option>
                        <option value="English" key="3">English</option>
                        <option value="LLB" key="4">LLB</option>
                    </select>
                    <input type="file" className="" alt="pic_missing" onChange={e=>setPic(e.target.files[0])} />

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={()=>UploadBook()}>
                        Upload
                    </Button>
                    </Modal.Footer>
                </Modal>
   
                <Row className="createdClass">
                    <Col md={4} lg={3} >
                        <Card className="libraryCard">
                            <div className="libraryBody">
                               <h4 >Department of CSE</h4>
                            </div>
                            <hr style={{backgroundColor:"white"}}/>
                            <div className="createdClassContent">
                                    <h2><Link to="/bookstore/CSE" className="link">Available PDF Book</Link></h2>
                            </div>
                        </Card>
                    </Col>
                    <Col md={4} lg={3} >
                        <Card className="libraryCard1">
                            <div className="libraryBody">
                               <h4 >Department of BBA</h4>
                            </div>
                            <hr style={{backgroundColor:"white"}}/>
                            <div className="createdClassContent">
                                <h2><Link to="/bookstore/BBA" className="link">Available PDF Book</Link></h2>
                            </div>
                        </Card>
                    </Col>
                    <Col md={4} lg={3} >
                        <Card className="libraryCard2">
                            <div className="libraryBody">
                               <h4 >Department of ENG</h4>
                            </div>
                            <hr style={{backgroundColor:"white"}}/>
                            <div className="createdClassContent">
                                    <h2><Link to="/bookstore/English" className="link">Available PDF Book</Link></h2>
                            </div>
                        </Card>
                    </Col>
                    <Col md={4} lg={3} >
                        <Card className="libraryCard3">
                            <div className="libraryBody">
                               <h4 >Department of LLB</h4>
                            </div>
                            <hr style={{backgroundColor:"white"}}/>
                            <div className="createdClassContent">
                                <h2><Link to="/bookstore/LLB" className="link">Available PDF Book</Link></h2>
                            </div>
                        </Card>
                    </Col>
                      
                </Row><br/>

                    <div style={{margin:"0 10%"}}>
                    <h4 style={{border:"1px solid gray",padding:"5px",textAlign:"center"}}>E-Books Database</h4>
                        <li><a href="https://www.cambridge.org/core" target="_blank">Cambridge University Press</a></li>
                        <li><a href="https://oxford.universitypressscholarship.com/" target="_blank">Oxford Scholarship Online</a></li>
                        <li><a href="https://muse.jhu.edu/" target="_blank">Project MUSE eBooks</a></li>
                    </div>
            </Container>
        </div>
    )
}

export default Library
