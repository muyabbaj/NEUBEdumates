import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Collapse, Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import img from '../img/study.jpg';

const ClassRoom = () => {
    const [openShareClass, setOpenShareClass] = useState(false); 
    const {courseId}=useParams()
    const [cdetails,setCdetails]=useState("")
    const [classpost,setPost]=useState("")
    const [allpost,setAllPost]=useState([])
    
    const sortData=allpost.map((item,index)=>{  
        return allpost[allpost.length-1-index];
     });
     
    
    useEffect(()=>{
        fetch(`/course/${courseId}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setCdetails(result)
        }).catch(e=>console.log(e))
    },[])
    
    useEffect(()=>{
        fetch(`/showclasspost/${courseId}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setAllPost(result)
        }).catch(e=>console.log(e))
    },[])

    const Sendpost=()=>{
        fetch('/classpost',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                post:classpost,
                courseId,
                
            })
        }).then(res=>res.json())
        .then(result=>{
            //setAllPost(result)
            if (result.error){
                toast.warning(result.error)
                openShareClass(false);
            }else{
                //console.log(result)
                toast.success("Successfully Posted")
                allpost.push(result)
                setPost(" ")
                setOpenShareClass(false);
                
            }
           
        })
        .catch(e=>console.log(e))
    }

    const makeComment=(text,postId)=>{
        fetch("/classcomment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                text,
                postId
            })
        }).then(res=>res.json())
        .then(comment=>{
            
            const newData=allpost.map(item=>{
                if(item._id===comment._id){
                    return comment
                }
                return item
            })
            // console.log(newData)
            setAllPost(newData)
        })
    }

    return (
        <div className="classParentDiv">
            
            <Card className="classRoomSection">
                <div className="classRoomHeader">
                    <Card.Img variant="top" src={img} style={{borderRadius:"15px"}} />
                    <div className="classHeaderContent">
                        <h2><Link to={`/course/${courseId}`} className="classHeaderLink" >{cdetails.title}</Link></h2>
                        <p>{cdetails.courseCode}</p>    
                    </div>
                    </div>
            </Card>

            <Card className="shareClassCard">
                <div className="shareClass">          
                <p
                onClick={() => setOpenShareClass(!openShareClass)}
                aria-controls="example-collapse-text"
                aria-expanded={openShareClass}
                 >
                Share something with your class
                </p>
                <Collapse in={openShareClass}>
                    <div id="example-collapse-text">
                        <div>
                            <textarea style={{width:"80%",marginLeft:"9%"}} rows="5" value={classpost} onChange={(e)=>setPost(e.target.value)}></textarea> 
                        </div>
                        <div className="shareClassBtn">
                            <Button
                            onClick={() => setOpenShareClass(!openShareClass)}
                            aria-controls="example-collapse-text"
                            aria-expanded={openShareClass} className="mr-4"
                            >
                                Close
                            </Button>
                            <Button onClick={()=>Sendpost()}>Post</Button>
                        </div>
                    </div>
                </Collapse>
                </div>
            </Card>
            {
                sortData.map((item)=>{
                    return(
                        <Card className="shareClassCard" key={item._id}>
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
                            <div className="classPost">
                                <p>{item.posts}</p>
                            </div>
                            <hr/>
                            <div className="commentSection">
                                <div id="example-collapse-text1">
                                        <div className="commentBox">
                                        <Accordion defaultActiveKey={1}>
                                         <Card>
                                            <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" className="comment" eventKey={1+1}>
                                                Comment
                                            </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={1+1}>
                                            <Card.Body>
                                            <div id="example-collapse-text">
                                                <div>
                                                    <form onSubmit={(e)=>{
                                                            e.preventDefault()
                                                            makeComment(e.target[0].value,item._id)
                                                            e.target[0].value=""
                                                        }}>
                                                        <input type="text" placeholder="add a comment" />  
                                                    </form>
                                                    {
                                                            item.comments.map(comment=>{
                                                                
                                                                return(
                                                                <h6 key={comment._id}><span style={{fontWeight:"500"}}>{comment.commentsBy.name}: </span> {comment.text}</h6>
                                                                )
                                                            })
                                                    }
                                                </div>          
                                            </div>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        </Accordion>                           
                                    </div>          
                                </div>
                            </div>                                            

                        </Card>
                    )
                })
            }
           
        </div>
    )
}

export default ClassRoom
