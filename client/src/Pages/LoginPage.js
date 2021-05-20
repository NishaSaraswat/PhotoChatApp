import React from 'react';
import axios from "axios";

function Loginpage(props) {
    
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = ()=>{
       
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        axios.post("http://localhost:5000/api/login",{
            email,
            password
        }).then(response=>{
            response = response.data;
            console.log(response.data);
            // localStorage.setItem("token",response.data.token);
            // props.history.push("/profile");
        }).catch(err=>{
          err = err.response.data;
        });
    };

    return (
        <div>
         <h1>Log in page</h1> 
         <label>Email</label>
         <input type = "text" placeholder="Enter your email" name="name" ref={emailRef}></input>
         <br></br><br></br>
         <label>Password </label>
         <input type = "password" placeholder="password" name="password"  ref={passwordRef}></input>
         <br></br><br></br>
         <button onClick={loginUser}>SignIn</button>
        </div>
    )
}
export default Loginpage;