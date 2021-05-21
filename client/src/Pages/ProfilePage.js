import React from 'react';
import {Link} from 'react-router-dom'
import avatar from '../images/avatar.jpeg'
import { FcCompactCamera} from 'react-icons/fc'
import Footer from "../Components/Footer"
import Header from '../Components/Header'
import { PromiseProvider } from 'mongoose';


const ProfilePage = (props) => {
    console.log(props)
    return (
        <>
        <Header/>
        <div className="profilePage">
            <img src={avatar} alt="avatar-spaceholder" className="avatar-spaceholder"/>
            <Link to="/camera"><FcCompactCamera className="camera-icon"/></Link>
            <div className="profilePage-btns">
                <button>My posts</button>
                <button>Enter chatrooms</button>
                <button onClick = {props.handleLogout}>Log Out</button>
            </div>
        </div>
        <Footer/>
        </>
);

}

export default ProfilePage
