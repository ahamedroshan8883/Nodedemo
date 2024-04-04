import axios from "axios";
import React, { useState } from "react"

export default function Welcome(){
    let [name,setName] = useState("");
    let [data,setData] = useState("");
    const greetuser = async()=>{
        const response = await axios.get(`http://localhost:8000/welcome/${name}`)
        setData(response.data);
        console.log(response.data);
    }
  return (<>
    <h1>welcome {data}</h1>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
    <button onClick={()=>greetuser()}>Submit</button>
  </>)
};