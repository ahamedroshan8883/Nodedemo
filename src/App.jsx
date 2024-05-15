
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './navBar/Navbar';
import { useState } from 'react';
import Movies from './Movies/moviesForm';
import Login from './Login/login';
import Logout from './Logout/logout';
import Welcome from './welcome';
import { Route,Routes } from "react-router-dom";


function App() {
  let [Username,setUsername] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar Username={Username}></Navbar>
      <Routes>
        <Route path='/' element={<Login setUsername = {setUsername}></Login>}></Route>
        <Route path='/Movies' element={<Movies></Movies>}></Route>
        <Route path='/Welcome' element={<Welcome username = {Username}></Welcome>}></Route>
        <Route path='/Login' element={<Login setUsername = {setUsername}></Login>}></Route>
        <Route path='/Logout' element={<Logout setUsername = {setUsername}></Logout>}></Route>
      </Routes>
      </BrowserRouter>

      {/* <Data></Data>
      <Welcome></Welcome>
      <Add></Add> */}
      {/* <Items></Items> */}
    </div>
  );
}

export default App;
