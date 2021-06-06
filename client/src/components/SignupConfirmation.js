import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure()
const SignupConfirmation = () => {
    const history=useHistory();
    const [email,setEmail]=useState("")
    const {activeToken}=useParams()

    const ActiveAccount=()=>{
        fetch('/active-account',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({activeToken})
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                toast.info(data.error)
            }else{            
    
                toast.info(data.message)
                history.push('/signin')
            }
        }).catch(e=>console.log(e))
    }
   
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <Button className="btn signin" onClick={()=>ActiveAccount()}>Active Your Account</Button><br/>                             
            </div>
        </div>
    )
}

export default SignupConfirmation
