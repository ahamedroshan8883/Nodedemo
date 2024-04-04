
import './App.css';
import Data from './Data'
import Welcome from './welcome';
import Add from './add';
import Items from './items';
import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
import Movies from './Movies/moviesForm';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav className="navList" >
      <Link className='navlistItem' to='/Data'>Data</Link>
      <Link className='navlistItem' to='/Add'>Add</Link>
      <Link className='navlistItem' to='/Items'>Items</Link>
      <Link className='navlistItem' to='/Movies'>Movies</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Welcome></Welcome>}></Route>
        <Route path='/Data' element={<Data></Data>}></Route>
        <Route path='/Add' element={<Add></Add> }></Route>
        <Route path='/Items' element={<Items></Items>}></Route>
        <Route path='/Movies' element={<Movies></Movies>}></Route>
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
