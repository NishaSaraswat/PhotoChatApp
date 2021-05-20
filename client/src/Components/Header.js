import React from 'react'
import Logo from '../images/logo/logo.png'

const Header = () => {
    return (
        <div>
             <img src={Logo} alt="logo" style={{marginLeft:"25px",position:'relative',height:'150px',marginBottom:"90px"}}></img>
        </div>
    )
}

export default Header
