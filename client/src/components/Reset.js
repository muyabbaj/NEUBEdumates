import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure()
const Reset = () => {
    const history=useHistory();
    const [email,setEmail]=useState("")
   
    const PasswordReset=()=>{
        fetch('/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email})
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
                <h4>Reset your password</h4>
                <input type="email" placeholder="email"
                 value={email}
                 onChange={e=>setEmail(e.target.value)} 
                />
               
                <Button className="btn signin" onClick={()=>PasswordReset()}>Reset</Button><br/>
                              
            </div>
        </div>
    )
}

export default Reset
