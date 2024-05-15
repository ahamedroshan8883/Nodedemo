import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Logout({setUsername}){
  useEffect(()=>{
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email')
    setUsername('');
  })
  return (<>
    <p>Successfully logout <Link to='/login'>Login</Link></p>
  </>)
};