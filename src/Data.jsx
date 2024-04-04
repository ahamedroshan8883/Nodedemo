import axios from "axios";
import React from "react"
import { useEffect } from "react";
import { useState } from "react"

export default function Data(){
    let [data,setData] = useState();
    const fetchData = async()=>{
        try{
            const response =await axios.get('http://localhost:8000/echo?input=hello');
            setData(response.data)
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (<>
    <h1>Data</h1>
    {JSON.stringify(data)}
  </>)
};