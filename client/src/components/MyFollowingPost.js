import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
const MyFollowing = () => {
    const [data,setData]=useState([])
    const [open, setOpen] = useState(false);
    const {state,dispatch}=useContext(UserContext);
    const sortData=data.map((item,index)=>{
       return data[data.length-1-index];
    });
    useEffect(()=>{
        fetch('/followingpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setData(data.posts)
            // console.log(data)
        })
        .catch(e=>console.log(e))
    },[]);
    const like=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({postId:id})
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          })
        .catch(e=>console.log(e))
    }
    const unlike=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({postId:id})
        }).then(res=>res.json())
        .then(result=>{
            console.log(result) 
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          })
        .catch(e=>console.log(e))
    }
    const makeComment=(text,postId)=>{
        fetch("/comment",{
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
            console.log(comment)
            const newData=data.map(item=>{
                if(item._id===comment._id){
                    return comment
                }
                return item
            })
            setData(newData)
        })
    }
    
    return (
        <div className="home">
            
                { 
                    sortData.map((item,index)=>{
                        return(
                        <div className="card home-card" key={item._id}>
                            
                            <div className="cardheader">
                                <div >
                                    <Image src={item.postedBy.pic} className="userImg"roundedCircle/>
                                 </div>
                                <div className="userName">
                                <h4><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link></h4>
                                </div>
                                <div className="dateTime">
                                    <p>{item.createdAt}</p>
                                </div>
                                
                            </div>
                            <hr/>
                         <div className="description">      
                                <p>{item.body}</p>
                         </div>
                            
                         <div>
                                        {
                                            item.photo?<img className="card-img" src={item.photo} alt="upload_missing" style={{height:"400px"}}/>
                                            :
                                            ""
                                        }
                                        
                                    </div>
                                    
                                    <div style={{padding:"3px"}}>

                                   <h6 style={{margin:"10px",display:"inline"}}>{item.likes.length} Likes</h6>
                                    <h6 style={{margin:"70px",display:"inline"}}>{item.comments.length} Comments</h6>
                                   </div>
                                    <hr style={{margin:'0',padding:'0'}}/>
                                    <Accordion defaultActiveKey={index}>
                                    <Card>
                                            <Card.Header>
                                            <div className="likeSection">
                                            {item.likes.includes(state._id)
                                            ? 
                                            <i className="material-icons" style={{color:"blue"}}
                                                    onClick={()=>{unlike(item._id)}}
                                            >thumb_up</i>
                                            : 
                                            <i className="material-icons" 
                                            onClick={()=>{like(item._id)}}
                                            >thumb_up</i>
                                            }
                                            </div>
                                            <Accordion.Toggle as={Button} variant="link" className="comment" eventKey={index+1}>
                                                Comment
                                            </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={index+1}>
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
                                                                <h6 key={comment._id}><span style={{fontWeight:"500"}}>{comment.postedBy.name}: </span> {comment.text}</h6>
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
                        )  
                    })
                    
                }
            
        </div>

    )
}

export default MyFollowing
