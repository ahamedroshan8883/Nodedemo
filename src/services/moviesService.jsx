import axios from "axios";

const getAllMovies = ()=>{
const token = localStorage.getItem('token');

return axios.get('http://localhost:8080/movies/',
{headers:{'Authorization':'Bearer '+JSON.parse(token)}})
}
const AddMovie = (movie)=>{
const token = localStorage.getItem('token');
    console.log("Bearer "+JSON.parse(token));
    return axios.post('http://localhost:8080/movies/addmovie',movie,{headers:{'Authorization':'Bearer '+JSON.parse(token)}})
}
const DeleteMovie = (id)=>{
    const token = localStorage.getItem('token');
    return axios.delete(`http://localhost:8080/movies/${id}`,{headers:{'Authorization':'Bearer '+JSON.parse(token)}})
}
const studentService = {
    getAllMovies,
    AddMovie,
    DeleteMovie
}
export default studentService;