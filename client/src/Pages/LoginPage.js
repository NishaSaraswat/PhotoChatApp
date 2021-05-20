import React from 'react';
import axios from "axios";
import {Box,Button,TextField} from "@material-ui/core";

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
            localStorage.setItem("token",response.data.token);
            props.history.push("/profile");
        }).catch(err=>{
          err = err.response.data;
        });
    };

    return (
        <div style={{textAlign:"center",lineHeight:"30px",backgroundColor:"white", fontSize:"12px",width:"240px",height:"350px",paddingLeft:"22px",marginLeft:"9px",marginTop:"100px",borderRadius:"15px"}}>
         <h1 style={{paddingTop:'30px',color:"ThreeDDarkShadow",marginRight:"25px"}}>Log In</h1> 
         <TextField   style={{marginRight:"20px",height:"40px",width:"200px",borderRadius:"8px"}} type = "text"  label="Enter your email"  name="name" ref={emailRef}></TextField>
         <br></br><br></br>
         <TextField style={{marginRight:"20px",height:"40px",width:"200px",borderRadius:"8px"}} type = "password" label="Enter password" name="password"  ref={passwordRef}></TextField>
         <br></br><br></br>
         <Box style={{marginTop:"20px",marginRight:"20px",backgroundColor:"yellow",color:"green"}} clone>
         <Button
            variant = "contained"
             size="large"
             color = "primary"
          onClick={loginUser}>SignIn</Button>
          </Box>
        </div>
    )
}
export default Loginpage;