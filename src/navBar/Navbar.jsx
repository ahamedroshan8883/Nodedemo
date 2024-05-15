import React from "react"
import { Link } from "react-router-dom";

export default function Navbar({Username}){
  
  return (<>
    <nav className="navList" >
      {/* <Link className='navlistItem' to='/Login'>Login</Link> */}
      {Username?
      <>
      <Link className='navlistItem' to='/welcome'>Welcome</Link>
      <Link className='navlistItem' to='/Movies'>Movies</Link>
      <Link className='navlistItem' to='/Logout'>Logout</Link>
      </>
    :''} 
      
      </nav>
     
  </>)
};