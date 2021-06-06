import React,{useState} from 'react'
import {Button} from 'react-bootstrap'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

toast.configure()
const Adduser = () => {
    const history=useHistory();
    const [email,setEmail]=useState("")
    const  [active,setActive]=useState(false)

    const access=()=>{
        fetch('/access',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify({
                email,
                active
            })
        }).then(res=>res.json())
        .then(data=>{
            //console.log(data)
            if(data.error){
                toast.warning(data.error);
            }else{
                toast.warning(data.message);
                history.push('/')
            }
        })
        .catch(e=>console.log(e))
    }
    
    return (
        <div className="mycard">
            <div className="card addUserCard input-field">
                <h4>Create Classes Access</h4>
               
                <input type="email" placeholder="Email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                />
                {/* <input type="text" placeholder="Student ID"
                 value={studentid}
                 onChange={e=>setStudentid(e.target.value)}
                /> */}
                
                <div style={{textAlign:"left",padding:"10px 0px"}}>
                    
                    <div className="form-check form-check-inline">
                      <span>
                         <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={active} onClick={()=>setActive("true")}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                      </span>
                    <span style={{marginLeft:"10px"}}>                      
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={active} onClick={()=>setActive("false")}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">Deactive</label>
                    </span>
                    </div>
                </div>
                {/* <input type="text" placeholder="Department"
                 value={department}
                 onChange={e=>setDepartment(e.target.value)}
                /> */}
                 {/* <input type="text" placeholder="Session"
                 value={session}
                 onChange={e=>setSession(e.target.value)}
                /> */}
               
                <Button className="btn signin" 
                onClick={()=>access()}
                >Access</Button>

            </div>
        </div>
    )
}

export default Adduser
