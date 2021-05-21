import React from 'react'
import axios from "axios";
import '../RegisterStyles/registerStyles.css'
import Header from '../Components/Header';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom"

 function Registerpage(props) {
     const nameRef = React.createRef();
     const emailRef = React.createRef();
     const passwordRef = React.createRef();

     const registerUser = ()=>{
         const name = nameRef.current.value;
         const email = emailRef.current.value;
         const password = passwordRef.current.value;
         axios.post("http://localhost:5000/api/register",{
             name,
             email,
             password
         }).then(response=>{
             response = response.data;
             props.history.push("/login");
         }).catch(err=>{
           err = err.response.data;
         });
     };
     const gobackToLogin=()=>{
        <Link to="/login"></Link>
     }
    return (
        <>
        <Header/>
        <div className='form'>
            <h1>Register here</h1>
            <input type = "text" 
                placeholder="Enter your Name"
                name="name"
                ref={nameRef}>
            </input>
            <br></br><br></br>
            <input type = "emil" 
                placeholder="example@gmail.com" 
                name="email" 
                ref={emailRef}>
            </input>
            <br></br><br></br>
                <input type = "password" 
                placeholder="password" 
                name="password"
                ref={passwordRef}>
                </input>
            <br></br><br></br>
            <button onClick={registerUser}>Register</button>
        </div>
        <ArrowBackIcon style={{marginLeft:"50px"}} onClick={gobackToLogin}/>
       </ >
    )
}
export default Registerpage