import React from 'react'
import Header from '../Components/Header'
import {Link} from 'react-router-dom'
import '../App.css'





 const Home = () => {
    return (
        <div style={{fontFamily:"monospace"}}> 
           <Header/>
            <Link to="/login"><h2 style={{marginLeft:"100px",color:"yellow",fontSize:"2em"}}>SignIn</h2></Link>
            <Link to="/register"><h2  style={{marginLeft:"100px", color:"yellow",fontSize:"2em"}}>SignUp</h2></Link>
           
        </div>
    )
}
export default Home;