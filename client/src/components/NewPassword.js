import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure()
const NewPassword = () => {
    const history=useHistory();
    const [newpassword,setNewpassword]=useState("")
    const {token}=useParams()
   
    const UpdatePassword=()=>{
        fetch('/new-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({newpassword,token})
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                toast.info(data.error)
            }else{            
                
                history.push('/signin')
                toast.info(data.message)
            }
        }).catch(e=>console.log(e))
    }
   
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h4>Update your password</h4>
                <input type="password" placeholder="new password"
                 value={newpassword}
                 onChange={e=>setNewpassword(e.target.value)} 
                />
               
                <Button className="btn signin" onClick={()=>UpdatePassword()}>Update</Button><br/>
                              
            </div>
        </div>
    )
}

export default NewPassword
