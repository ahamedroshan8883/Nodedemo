import axios from "axios";
import React, { useState } from "react"

export default function Add(){
    let [number1,setNumber1] = useState(0);
    let [number2,setNumber2] = useState(0);
    let [data,setData] = useState({});
    const addNums = async()=>{
        const input = {'number1':Number(number1),'number2':Number(number2)};
        const response = await axios.post('http://localhost:8000/add',input);
        console.log(response.data);
        setData(response.data)
    }
  return (<>
    <h1>add</h1>
    Enter number1<input type="text" value={number1} onChange={(e)=>setNumber1(e.target.value)}/><br/>
    Enter number2<input type="text" value={number2} onChange={(e)=>setNumber2(e.target.value)}/><br/>
    <button onClick={()=>addNums()}>add</button>
    {JSON.stringify(data)}
  </>)
};