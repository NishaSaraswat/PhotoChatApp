import React from 'react'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MmsRoundedIcon from '@material-ui/icons/MmsRounded';
import InsertCommentRoundedIcon from '@material-ui/icons/InsertCommentRounded';

const Footer = () => {
    return (
        <div>
                <footer>
                    <div className="footericons">
                    <MmsRoundedIcon/>
                    <HomeRoundedIcon/>
                    <InsertCommentRoundedIcon/>
                    </div>
                </footer>
        </div>
    
    )
}

export default Footer
