import axios from 'axios'
const login=(user)=>{
    console.log(user);
    return axios.post('http://localhost:8080/users/signin',user)
}
const UserService={
    login
}
export default UserService;
