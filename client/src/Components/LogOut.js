import React from 'react'
import { getUser, removeUserSession } from '../utils/common';
import ProfilePage from "../Pages/ProfilePage"

const LogOut = (props) => {
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
      }
     
      return (
        <div>
          Welcome {user.name}!<br /><br />
          <ProfilePage handleLogout = {handleLogout} />
        </div>
      );
    }
     
export default LogOut
