import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure()
const Addnotice = () => {
    const history=useHistory()

    // const [author,setAuthor]=useState("")
    const [title,setTitle]=useState("")
    const [image,setPic]=useState("")
    
    const [url,setUrl]=useState("")
    useEffect(() => {
        if(url){
          fetch("/createnotice",{
              method:"post",
              headers:{
                  "Content-Type":"application/json",
                  //"Authorization": "Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  title,
                  pic:url
                  
              })
          }).then(res=>res.json())
          .then(data=>{
            toast.success("Notice Uploaded")
            history.push('/')
          })
          .catch(e=>console.log(e))
        }
      }, [url])
    
      
    const uploadNotice=()=>{
        
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
       }
    }
    return (
        <div className="mycard">
            <div className="card addUserCard input-field">
                <h4>Upload Academic Notice</h4>
                <textarea  placeholder="Notice Title"
                  rows="4"
                  value={title}
                  onChange={e=>setTitle(e.target.value)}
                />
                 
                <input type="file" onChange={(e)=>setPic(e.target.files[0])} />
                {/* onChange={(e)=>updatePhoto(e.target.files[0])}  */}
                
                <Button className="btn signin" 
                onClick={()=>uploadNotice()}
                >Upload Notice</Button>

            </div>
        </div>
    )
}

export default Addnotice