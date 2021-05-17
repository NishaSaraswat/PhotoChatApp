import React from 'react'
import { Link } from 'react-router-dom'

 const LoginPage = () => {
    return (
        <div>
        <label>Email: </label>
        <input type="email" placeholder = "abc@test.com" name="email"></input>
        <br/> <br/>
       <label>Password: </label>
       <input type = "password" placeholder = "Password" name="password"></input>
       <h2><Link to ='#'>Log In</Link></h2>
       <br></br>
       <Link to ='/register'>Register</Link>
   </div>
    )
}
export default LoginPage