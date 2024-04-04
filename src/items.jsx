import axios from "axios";
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

export default function Items(){
    let[items,setItems] = useState([]);
    let [input,SetInput] = useState({
        name:"",
        price:0
    });
    const getItems = async()=>{
        try{
            const response = await axios.get('http://localhost:8000/api/items')
            const items = await response.data;
            setItems(items)
            console.log(items);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getItems()
    },[])
    const handleSubmit = async(e,input)=>{
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/additems',input);
        console.log(response.data);
        getItems();
        SetInput({
            name:"",
            price:0
        });
    }
    const handlechanges = (e)=>{
        const {name,value} = e.target;
        SetInput({...input,[name]:value})
        console.log(input); 
    }

    const  handleDelete = async(id)=>{
        try{
            const response = await axios.delete(`http://localhost:8000/api/item/${id}`)
            console.log(response.data);
            await getItems();
        }catch(error){
            console.log(error);
        }
    }
  return (<>
    <h1>items</h1>
    <div className="form" style={{maxWidth:"55rem",width:"100vw",margin:"1rem auto",textAlign:"left",padding:"30px 20px",backgroundColor:"#f2f2f2",borderRadius:"1rem",display:"flex",flexDirection:"column"}}>
    <Form onSubmit={(e)=>handleSubmit(e,input)}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Item name</Form.Label>
        <Form.Control type="text" placeholder="Enter item name" value={input.name} name="name" onChange={(e)=>handlechanges(e)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter item price" value={input.price} name="price" onChange={(e)=>handlechanges(e)}/>
      </Form.Group>
      <div className="butbox" style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
        <Button  variant="primary" type="submit" className="btn" style={{marginRight:"1rem"}}>Submit</Button>
        <Button variant="danger" className="btn" type="reset" onClick={()=>SetInput({name:"",price:0})} >Reset</Button>
      </div>
    </Form>
    </div>
    {/* {JSON.stringify(items)}; */}
    <div className="table" style={{margin:"0 auto",maxWidth:"60rem"}}>
    <Table striped bordered hover variant="info">
      <thead>
        <tr>
          <th>Name of items</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.length >1 ? items.map(item=><tr>
          <td>{item.name}</td>
          <td>{item.price}₹</td>
          <td><Button variant="outline-danger" onClick={()=>{handleDelete(item.id)}} style={{marginRight:"1rem"}}><FaTrash/></Button>
          <Button variant="outline-primary"><FiEdit/></Button></td>
        </tr>):<tr><td colSpan={3}>NO ITEMS FOUND</td></tr>}
      </tbody>
    </Table>
    </div>
  </>)
};