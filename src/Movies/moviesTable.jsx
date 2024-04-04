import React, { useEffect } from "react"
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Button } from "react-bootstrap";
import axios from "axios";
export default function MoviesTable({data,getData,getDataByIDpar}){
    console.log(data);
    const handelDelete = async(id)=>{
      try{
        const response = await axios.delete(`http://localhost:8001/api/movie/${id}`);
        console.log(response.data);
        getData();
      }catch(error){
        console.log(error);
      }
    }
    const getDataById = async(movie)=>{
      try{
        const response = await axios.get(`http://localhost:8001/api/movies/${movie.id}`);
        getDataByIDpar(response.data);
        // console.log(response.data);
      }catch(error){
        console.log(error);
      }
    }
  return (<>
    <h1>movies</h1>
    <div className="table" style={{margin:"0 auto",maxWidth:"60rem"}}>
    <Table striped bordered hover variant="info">
      <thead>
        <tr>
          <th>Movie name</th>
          <th>Director</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length >1 ? data.map(item=><tr>
          <td>{item.moviename}</td>
          <td>{item.director}</td>
          <td><Button variant="outline-danger" onClick={()=>{handelDelete(item.id)}} style={{marginRight:"1rem"}}><FaTrash/></Button>
          <Button variant="outline-primary" onClick={()=>getDataById(item)}><FiEdit/></Button></td>
        </tr>):<tr><td colSpan={3}>NO ITEMS FOUND</td></tr>}
      </tbody>
    </Table>
    </div>
  </>)
};