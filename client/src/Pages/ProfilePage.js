import React from 'react';
import {Link} from 'react-router-dom'
import avatar from '../images/avatar.jpeg'
import { FcCompactCamera} from 'react-icons/fc'


const ProfilePage = () => {
    return (
        <div className="profilePage">
            <img src={avatar} alt="avatar-spaceholder" className="avatar-spaceholder"/>
            <Link to="/camera"><FcCompactCamera className="camera-icon"/></Link>
            <div className="profilePage-btns">
                <button>My posts</button>
                <button>Enter chatrooms</button>
                <button>Log Out</button>
            </div>
        </div>
);

}

export default ProfilePage
