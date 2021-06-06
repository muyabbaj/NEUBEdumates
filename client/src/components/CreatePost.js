import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure()
const CreatePost = () => {
    const history=useHistory()

    // const [author,setAuthor]=useState("")
    const [body,setBody]=useState("")
    const [image,setPic]=useState("")
    
    const [url,setUrl]=useState("")
    useEffect(() => {
        if(url){
          fetch("/createpost",{
              method:"post",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization": "Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  body,
                  pic:url
                  
              })
          }).then(res=>res.json())
          .then(data=>{
            toast.success("Successfully Posted")
            history.push('/')
          })
          .catch(e=>console.log(e))
        }
      }, [url])
      
    const Post=()=>{
        
       if(image.name){
        const data =new FormData()
        
        // console.log(data)
        data.append("file",image)
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
       }else{
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body
            })
        }).then(res=>res.json())
        .then(data=>{
            toast.success("Successfully Posted")
            history.push('/')
        })
        .catch(e=>console.log(e))
       }
    }
    return (
        <div>
            <div className="card home-card createpost">
                <h4>Create Post</h4>
                 <textarea style={{height:"200px"}} type="text" placeholder="What's your mind?"
                    value={body}
                    onChange={e=>setBody(e.target.value)}
                /> <br/>
                <input type="file" className="" alt="pic_missing" onChange={e=>setPic(e.target.files[0])} /> <br/>
                <Button className="postbtn" onClick={()=>Post()}>Post</Button>
            </div>
        </div>
    )
}

export default CreatePost
