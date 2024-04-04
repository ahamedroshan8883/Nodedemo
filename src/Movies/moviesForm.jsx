import axios from "axios"
import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MoviesTable from "./moviesTable";

export default function Movies(){
    let InitialState = {
        moviename:"",
        director:""     
           }
    let[data,setDatas] = useState([]);
    let[dataInputs,setDatainputs] = useState(InitialState);
    let [Iseditable,setIseditable] = useState(false);
    const getData = async()=>{
        try{
            const response = await axios.get('http://localhost:8001/api/movies');
            setDatas(response.data);
            setDatainputs(InitialState);
        }catch(error){

        }
    }
    const  getDataByIDpar = (item)=>{
      setDatainputs(item);
      setIseditable(true);
    }
    useEffect(()=>{
        getData()
    },[])
    const handlechanges = (e)=>{
        const{name,value} = e.target;
        setDatainputs({...dataInputs,[name]:value})
        console.log(dataInputs);
    }

    const handleSubmit = async(e,input)=>{
        e.preventDefault();
        // try{
        //       const response = await axios.post('http://localhost:8001/api/addmovies',input)
        //       console.log(response.data);
        //       await getData()
        //   }catch(error){
        //       console.log(error);
        //   }
        if(Iseditable){
          try{
            const response = await axios.put('http://localhost:8001/api/movies',input)
            console.log(response.data);
            await getData()
            setIseditable(false);
        }catch(error){
            console.log(error);
        }
        }else if(!Iseditable){
          try{
            const response = await axios.post('http://localhost:8001/api/addmovies',input)
            console.log(response.data);
            await getData()
        }catch(error){
            console.log(error);
        }
        }
    }
  return (<>
    <h1>movies</h1>
    <div className="form" style={{maxWidth:"55rem",width:"100vw",margin:"1rem auto",textAlign:"left",padding:"30px 20px",backgroundColor:"#f2f2f2",borderRadius:"1rem",display:"flex",flexDirection:"column"}}>
    <Form onSubmit={(e)=>handleSubmit(e,dataInputs)}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Movie name</Form.Label>
        <Form.Control type="text" placeholder="Enter movie name" value={dataInputs.moviename} name="moviename" onChange={(e)=>handlechanges(e)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Director</Form.Label>
        <Form.Control type="text" placeholder="Enter director name" value={dataInputs.director} name="director" onChange={(e)=>handlechanges(e)}/>
      </Form.Group>
      <div className="butbox" style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
        <Button  variant="primary" type="submit" className="btn" style={{marginRight:"1rem"}}>Submit</Button>
        <Button variant="danger" className="btn" type="reset" onClick={()=>setDatainputs({moviename:"",director:""})} >Reset</Button>
      </div>
    </Form>
    </div>
    {/* {JSON.stringify(data)} */}
    <MoviesTable data={data} getData={getData} getDataByIDpar={getDataByIDpar}></MoviesTable>
  </>)
};