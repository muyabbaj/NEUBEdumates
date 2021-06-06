import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Card, Image } from 'react-bootstrap';
import { UserContext } from '../App';
import Loading from './Loading';

const Profile = () => {
    const [data,setData]=useState([])
    const [open, setOpen] = useState(false);
    const {state,dispatch}=useContext(UserContext)
    const [image,setImage] = useState("")
    const [success,settSuccess]=useState(false)

    // console.log(state)
    const mypost=data.map((item,index)=>{
        return data[data.length-1-index];
     });
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then((result)=>{
            // console.log(result)
            setData(result.mypost)
        })
        .catch(e=>console.log(e))
    },[])
    useEffect(()=>{
        if(image){
            const data =new FormData()
            // console.log(data)
            data.append("file",image)
            data.append("upload_preset","neubmates")
            data.append("cloud_name","muyabbaj")
            // console.log(data)
    
            fetch("https://api.cloudinary.com/v1_1/muyabbaj/image/upload",{
             method:"post",
             body:data
         })
         .then(res=>res.json())
         .then(data=>{
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
                // window.location.reload()
                settSuccess(true)
            })
        
         })
         .catch(err=>{
             console.log(err)
         })
        }
     },[image])
     const updatePhoto = (file)=>{
         setImage(file) 
    }
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

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    return (
        <div className="profile" style={{maxWidth:"560px",margin:"20px auto"}}>
            
            <div className="profileDetails">    
                    <div className="ProfilePic">
                        <img style={{width:"100px",height:"100px",borderRadius:"50%",border:"1px solid green",margin:"10px"}}
                        src={state? state.pic:"No photo"}
                        />
                        
                    </div>

                    <div  className="userDetails">
                        <h4>{state?state.name:<Loading/>}</h4>
                        <h4>{state?state.email:<Loading/>}</h4>
                        <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                            <h6>{data.length} posts</h6>
                            <h6>{state?state.followers.length:"0"} followers</h6>
                            <h6>{state?state.following.length:"0"} following</h6>
                        </div>

                    </div>
                    {
                        success? <div className="file-field input-field" style={{margin:"10px"}}>
                            <div className="upload-btn-wrapper">
                                 <button className="profileBtn">Update Profile Picture </button>
                                 <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} /> 
                            </div>
                    </div>
                    :
                    <div className="file-field input-field" style={{margin:"10px"}}>
                    <div className="upload-btn-wrapper">
                        <button className="profileBtn">Upload Profile Picture </button>
                        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} /> 
                    </div>
                     </div>
                    }         
           </div>
           <div className="home">
            {
                mypost.map((item,index)=>{
                    let d=new Date(item.createdAt);
                    let date=d.toLocaleString();
                    return(
                    <div className="card home-card" key={item._id}>
                         <div className="cardheader">
                             <div >
                                <Image src={item.postedBy.pic} className="userImg"roundedCircle/>
                             </div>
                                <div className="userName">
                                <h4>{item.postedBy.name}
                                <span style={{margin:"3px",color:"blue"}}> {item.postedBy._id == state._id 
                             && <i className="material-icons" style={{
                                 float:"right",marginTop:"5px"
                             }} 
                             onClick={()=>deletePost(item._id)}
                             >delete</i>
                             }</span>
                                </h4>
                                </div>
                                <div className="dateTime">
                                    <p>{date}</p>
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
              
        </div>
    )
}

export default Profile
