import React, {useState}from 'react';
import axios from "axios";
import {Box,Button,TextField} from "@material-ui/core";
import Header from '../Components/Header'
import {setUserSession} from '../utils/common'




function Loginpage(props) {
    
    // const emailRef = React.createRef();
    // const passwordRef = React.createRef();

        const [loading, setLoading] = useState(false);
        const email = useFormInput('');
        const password = useFormInput('');
        const [error, setError] = useState(null);
 

    const loginUser = ()=>{
       
        // const email = emailRef.current.value;
        // const password = passwordRef.current.value;
        setError(null);
        setLoading(true);
        axios.post("http://localhost:5000/api/login",{
            // email,
            // password
            email: email.value, password: password.value }).then(response => {
                setLoading(false);
                setUserSession(response.data.token, response.data.user);
                props.history.push("/profile");
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
          });
        // .then(response=>{
        //     response = response.data;
        //     console.log(response.data);
        //     localStorage.setItem("token",response.data.token);
        //     props.history.push("/profile");
        // }).catch(err=>{
        //   err = err.response.data;
        // });
    };

    return (
        <>
        <Header/>
        <div style={{textAlign:"center",lineHeight:"30px",backgroundColor:"white", fontSize:"12px",width:"240px",height:"350px",paddingLeft:"22px",marginLeft:"9px",borderRadius:"15px"}}>
         <h1 style={{paddingTop:'30px',color:"ThreeDDarkShadow",marginRight:"25px"}}>Log In</h1> 
         <TextField   style={{marginRight:"20px",height:"40px",width:"200px",borderRadius:"8px"}} type = "email"  label="Enter your email"  name="name" {...email}></TextField>
         <br></br><br></br>
         <TextField style={{marginRight:"20px",height:"40px",width:"200px",borderRadius:"8px"}} type = "password" label="Enter password" name="password"  {...password}></TextField>
         <br></br><br></br>
         <Box style={{marginTop:"20px",marginRight:"20px",backgroundColor:"yellow",color:"green"}} clone>
         <Button
            variant = "contained"
             size="large"
             color = "primary"
          onClick={loginUser}>SignIn</Button>
          </Box>
        </div>
        </>
    );
}
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
export default Loginpage;