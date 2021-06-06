import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import q1 from '../img/q1.png';
const QuestionBank = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [department,setDepartment]=useState("")
    const [subject,setSubject]=useState("")
    const [semester,setSemester]=useState("")
    const [ctname,setCtname]=useState("")
    const [pic,setPic]=useState("")
    const [url,setUrl]=useState("")
    
    const[question,setQuestion]=useState([])

    const sortData=question.map((item,index)=>{  
        return question[question.length-1-index];
     });

    //console.log(question)
    useEffect(()=>{
        fetch('/showquestion',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setQuestion(data)
        })
        .catch(e=>console.log(e))
    },[url])

    useEffect(()=>{
        fetch('/postquestion',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                department,
                subject,
                semester,
                ctname,
                questionLink:url
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
    
    const UploadQuestion=()=>{
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
            <div>
                <div className="createClassBtn">
                    
                   <div>
                        <div>
                        {/* <select onChange={e=>setDepartment(e.target.value)} style={{display:"inline",width:"25%"}}>
                            <option selected disabled hidden>Select Your Department</option>
                            <option value="CSE">CSE</option>
                            <option value="BBA">BBA</option>
                            <option value="English">English</option>
                            <option value="LLB">LLB</option>
                        </select>
                        <Button variant="primary" style={{marginBottom:"10px",marginRight:"20px",marginLeft:"5px"}}><span>Search</span>
                        </Button> */}
                        <Button variant="dark"  onClick={handleShow} style={{marginBottom:"10px"}}>
                        <i className="material-icons">add_circle</i> <span>Upload Question</span>
                        </Button>
                        </div>
                        
                   </div>
                    <Modal show={show} onHide={handleClose} className="customModalSize">
                        <Modal.Header closeButton>
                        <Modal.Title>Upload Question</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <select onChange={e=>setDepartment(e.target.value)} >
                            <option selected disabled hidden>Select Your Department</option>
                            <option value="CSE">CSE</option>
                            <option value="BBA">BBA</option>
                            <option value="English">English</option>
                            <option value="LLB">LLB</option>
                        </select>
                        <input type="text" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)}/>
                        <input type="text" placeholder="Semester" value={semester} onChange={e=>setSemester(e.target.value)}/>
                        <input type="text" placeholder="Course Teacher Name" value={ctname} onChange={e=>setCtname(e.target.value)}/>
                        <input type="file" className="" alt="pic_missing" onChange={e=>setPic(e.target.files[0])} /> 
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={()=>UploadQuestion()}>
                            Upload
                        </Button>
                        </Modal.Footer>
                    </Modal>
               </div>
            </div>
            <div>
            <Container fluid>
            
                <Row className="createdClass">
                    {
                        sortData.map((item)=>{
                            return(
                                <Col md={4} lg={3} key={item._id}>
                                    <Card className="bookCard">
                                        <div className="questionPic">
                                            <Image src={item.questionLink} 
                                            width="100%" height="100%"
                                            />
                                            </div>  
                                        
                                        <div className="bookDetails">
                                                
                                        <h6>Subject: {item.subject}</h6>
                                        <p>Semester: {item.semester}</p>
                                        <p>Course Teacher: {item.courseTeacherName}</p>
                                        <p>Department: {item.department}</p>
                                                
                                        <a href={q1}  download><Button block>Download</Button></a>
                    
                                        </div>
                                    </Card>
                                </Col>      
                            )
                        })
                    }
                                
                </Row>
               
            </Container>
        </div>
            
        </div>
    )
}

export default QuestionBank
