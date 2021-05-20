import React from 'react'
import axios from "axios";

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
    return (
        <div>
            <h1>Register here</h1>
            <label>Name </label>
            <input type = "text" 
                placeholder="Enter your Name"
                name="name"
                ref={nameRef}>
            </input>
            <br></br><br></br>
            <label>Email </label>
            <input type = "emil" 
                placeholder="example@gmail.com" 
                name="email" 
                ref={emailRef}>
            </input>
            <br></br><br></br>
            <label>Password </label>
                <input type = "password" 
                placeholder="password" 
                name="password"
                ref={passwordRef}>
                </input>
            <br></br><br></br>
            <button onClick={registerUser}>Register</button>
        </div>
    )
}
export default Registerpage