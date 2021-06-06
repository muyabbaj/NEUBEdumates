import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

const Addbook = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history=useHistory()

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
                history.push('/')
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
        <div className="mycard">
            <div className="card addUserCard input-field">
                <h4>Upload Book</h4>
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

                {/* onChange={(e)=>updatePhoto(e.target.files[0])}  */}
                
                <Button variant="primary" onClick={()=>UploadBook()}>
                        Upload
                    </Button>

            </div>
        </div>
    )
}

export default Addbook
