import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Userservices from "../services/userServices";
import { useNavigate } from "react-router-dom";

export default function Login({setUsername}){
  let [userInput,setUserInput] = useState({email:"",password:""});
  let [Ispwdvisible,setISpwdvisible] = useState(false);

  let navigate = useNavigate();
  const handlechanges = (e)=>{
    const {name,value} = e.target;
    setUserInput({...userInput,[name]:value});
  }
  const handlesubmit = (e,userInput)=>{
    e.preventDefault();
    validateUser(userInput);
    // console.log(userInput);
    setUserInput({email:"",password:""})
  }
  const parseJwt = (token)=>{
    if(!token){return};
    const base64Url = token.split('.')[1]
    console.log(base64Url);
    console.log(JSON.parse(window.atob(base64Url)));
    return JSON.parse(window.atob(base64Url));
  }
  const validateUser = async(user)=>{
    try{
      const response  = await Userservices.login(user);
      // console.log(user);
      
      let token = response.data;
      console.log(token);
      let userData = parseJwt(token);
      localStorage.setItem('token',JSON.stringify(token));
      localStorage.setItem('username',userData.username);
      localStorage.setItem('email',userData.email)
      // console.log(userData.username);
       setUsername(userData.username)
      navigate('/welcome'); 
    }catch(error){
      console.log(error);
    }
  }
  return (<>
    <h1>login</h1>
    <div className="login-container" style={{width:"40rem",margin:"0 auto"}}>
    <Form onSubmit={(e)=>handlesubmit(e,userInput)}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={userInput.email} name="email" onChange={handlechanges} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" style={{position:"relative"}}>
        <Form.Label>Password</Form.Label>
        <Form.Control type={Ispwdvisible?"password":"text"} placeholder="Password" value={userInput.password} name="password" onChange={handlechanges} />
        {Ispwdvisible==false ? <FaEye style={{position:"absolute",right:"1rem",top:"2.75rem"}} onClick={()=>setISpwdvisible(!Ispwdvisible)}/>:
        <FaEyeSlash style={{position:"absolute",right:"1rem",top:"2.75rem"}} onClick={()=>setISpwdvisible(!Ispwdvisible)}/>}
      </Form.Group>
      <Button type="submit" variant="primary">Submit</Button>&nbsp;
      <Button variant="danger" onClick={()=>setUserInput({email:"",password:""})}>Reset</Button>
    </Form>
    </div>
   
    {JSON.stringify(userInput)};
  </>)
};