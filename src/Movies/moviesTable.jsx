import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Button } from "react-bootstrap";
import axios from "axios";
import moviesService from "../services/moviesService";

export default function MoviesTable({movies,getData,getDataByIDpar}){
  
    const handelDelete = async(id)=>{
      try{
        const response = await moviesService.DeleteMovie(id);
        console.log(response.data);
        getData();
      }catch(error){
        console.log(error);
      }
    }
    const getDataById = async(movie)=>{
      console.log(movie);
        getDataByIDpar(movie,movie._id);
        // console.log(response.data);
    }
    
  return (<>
    <h1>movies</h1>
    <div className="table" style={{margin:"0 auto",maxWidth:"60rem"}}>
    <Table striped bordered hover variant="info">
      <thead>
        <tr>
          <th>Movie name</th>
          <th>Director</th>
          <th>Description</th>
          <th>Result</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{movies.length >=1 ? movies.map(item=><tr key={item._id}>
          <td>{item.moviename}</td>
          <td>{item.director}</td>
          <td>{item.description}</td>
          <td>{item.result}</td>
          <td>
          <Button variant="outline-danger" onClick={()=>{handelDelete(item._id)}} style={{marginRight:"1rem"}}><FaTrash/></Button>
          <Button variant="outline-primary" onClick={()=>getDataById(item)}><FiEdit/></Button></td>
        </tr>):<tr ><td  colSpan={3}>NO ITEMS FOUNDED</td></tr>}
      </tbody>
    </Table>
    </div>
  </>)
};