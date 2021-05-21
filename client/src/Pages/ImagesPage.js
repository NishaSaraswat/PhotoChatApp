import React from 'react'
import Logo from '../images/logo/logo-meetDev.png'
import '../App.css'
import Post from './Post'



 const ImagesPage = () => {
    return (
        <div className="Main">
           
            <div className="Main-header">
                <img 
                    className="Main_logo-meetDev"
                    src={Logo} 
                    alt="logo-meetDev"
                />
            </div>
            
            <Post/>

        </div>
    )
}
export default ImagesPage;
