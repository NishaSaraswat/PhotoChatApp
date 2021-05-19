import React from 'react'
import Camera from '../Components/Camera';
//import Avatar from '../Components/Avatar';

//import CameraNew from '../Components/CameraNew';

const ProfilePage = () => {
    return (
        <div className="profilePage">
            <Camera />
            <div className="profilePage-btns">
                <button>My posts</button>
                <button>Enter chatrooms</button>
                <button>Log Out</button>
            </div>
        </div>
);

}

export default ProfilePage
