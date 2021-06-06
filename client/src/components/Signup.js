import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { toast } from 'react-toastify';


toast.configure()
const Signup = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [studentid,setStudentid]=useState("")
    const  [gender,setGender]=useState("")
    const [department,setDepartment]=useState("")
    const [session,setSession]=useState("")
    const [password,setPassword]=useState("")

   
    const post=()=>{
        fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                studentid,
                gender,
                department,
                session,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                toast.info(data.error)
            }else{
                //toast.success(data.message)
                history.push('/signin')
            }
        })
        .catch(e=>{
            console.log(e)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h4>Signup</h4>
                <input type="text" placeholder="Name"
                 value={name}
                 onChange={e=>setName(e.target.value)}
                />
                <input type="email" placeholder="Email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                />
                <input type="text" placeholder="Student ID"
                 value={studentid}
                 onChange={e=>setStudentid(e.target.value)}
                />
                
                <div style={{textAlign:"left"}}>
                    <h6 style={{padding:'0',margin:"0"}}>Gender: </h6>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={gender} onClick={()=>setGender("Male")}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={gender} onClick={()=>setGender("Female")}/>
                        <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={gender} onClick={()=>setGender("Custom")}/>
                        <label className="form-check-label" htmlFor="inlineRadio2">Custom</label>
                    </div>
                </div>
                <input type="text" placeholder="Department"
                 value={department}
                 onChange={e=>setDepartment(e.target.value)}
                />
                 <input type="text" placeholder="Session"
                 value={session}
                 onChange={e=>setSession(e.target.value)}
                />
                <input type="password" placeholder="password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                />
                <Button className="btn signin" 
                onClick={()=>post()}
                >Signup</Button>



            </div>
        </div>
    )
}

export default Signup
