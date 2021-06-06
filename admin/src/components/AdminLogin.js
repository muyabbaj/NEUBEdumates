import React,{useState,useContext} from 'react'
import M from 'materialize-css'
import {useHistory,Link} from 'react-router-dom'
import {UserContext} from '../App'
import {Button} from 'react-bootstrap'

const AdminLogin = () => {
    const history=useHistory();
    const {dispatch}=useContext(UserContext);
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    // console.log(password)
    const Signin=()=>{
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email,password})
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }else{            
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Successfully Signin",classes:'green darken-1'})
                history.push('/')
            }
        }).catch(e=>console.log(e))
    }
    
   
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h4>Signin</h4>
                <input type="text" placeholder="email"
                 value={email}
                 onChange={e=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />
                <Button className="btn signin" onClick={()=>Signin()}>Signin</Button>
                <Link to="/reset">Forgot password?</Link>
                <br/>
                
                <button className="btn singinBtn">
                    <Link to="/signup" style={{color:"white"}} className="createSignup">
                    Create an account
                     </Link>
                </button>
                
            </div>
        </div>
    )
}

export default AdminLogin
