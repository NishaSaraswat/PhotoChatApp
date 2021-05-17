import React from 'react'
import Avatar from '../Components/Avatar'

const ProfilePage = () => {
    return (
        <div className="profilePage">
            <Avatar />
            <div className="profilePage-btns">
                <button>My posts</button>
                <button>Enter chatrooms</button>
                <button>Log Out</button>
            </div>
        </div>
);

}

export default ProfilePage
