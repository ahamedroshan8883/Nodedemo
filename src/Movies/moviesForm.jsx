import axios from "axios"
import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MoviesTable from "./moviesTable";
import moviesService from "../services/moviesService";

export default function Movies(){
    let InitialState = {
        moviename:"",
        director:"",
        description:"",
        result:""
           }
    let[movies,setMovies] = useState([]);
    let[dataInputs,setDatainputs] = useState(InitialState);
    let [Iseditable,setIseditable] = useState(false);
    let[idforedit,Setidforedit] = useState('');

    const getData = async()=>{
        try{
            const response = await moviesService.getAllMovies();
            console.log(response.data);
            setMovies(response.data.movies);
            setDatainputs(InitialState);
        }catch(error){
          console.log(error);
        }
    }
    const  getDataByIDpar = (item,input)=>{
      setDatainputs(item);
      setIseditable(true);
      Setidforedit(input);
      console.log(input);
    }
    useEffect(()=>{
        getData()
    },[])
    const handlechanges = (e)=>{
        const{name,value} = e.target;
        setDatainputs({...dataInputs,[name]:value})
        // console.log(dataInputs);
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
        // if(Iseditable){
        //   try{
        //     const response = await axios.put(`http://localhost:8080/movies/${idforedit}`,input)
        //     console.log(response.data);
        //     await getData()
        //     setIseditable(false);
        // }catch(error){
        //     console.log(error);
        // }
        // }else if(!Iseditable){
          try{
            console.log(input);
            const response = await moviesService.AddMovie(input)
            console.log(response.data);
            await getData()
        }catch(error){
            console.log(error);
        }
        // }
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
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Describe about movie" name="description" value={dataInputs.description} onChange={(e)=>handlechanges(e)}/>
      </Form.Group>
      <Form.Group  controlId="formGridState">
          <Form.Label>Result</Form.Label>
          <Form.Select  name="result" onChange={(e)=>handlechanges(e)} value={dataInputs.result}>
            <option>Flop</option>
            <option>Average</option>
            <option>Hit</option>
            <option>Super Hit</option>
            <option>Blockbuster</option>
          </Form.Select>
        </Form.Group>
      <div className="butbox mb-3" style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",margin:"1rem"}}>
        <Button  variant="primary" type="submit" className="btn" style={{marginRight:"1rem"}}>Submit</Button>
        <Button variant="danger" className="btn" type="reset" onClick={()=>setDatainputs({moviename:"",director:""})} >Reset</Button>
      </div>
    </Form>
    </div>
    {/* {JSON.stringify(dataInputs)} */}
    <MoviesTable movies={movies} getData={getData} getDataByIDpar={getDataByIDpar}></MoviesTable>
  </>)
};