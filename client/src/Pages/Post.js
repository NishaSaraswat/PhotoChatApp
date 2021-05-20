import React from 'react';
import './Post.css';
import Avataricon from "@material-ui/core/Avatar";

function Post() {
    return (
        <div className="post">
        
        {/*Header + avatar + username*/}
            <div className="post-header">
                <Avataricon
                    className="post-avatar"
                    alt={''}
                    src="/static/images/avatar/1.jpg"
                />
                
                <h3>Username</h3>
            </div>

        
            <img 
                className="post-image"
                src="https://cdn.pixabay.com/photo/2021/05/14/08/44/running-6252827_1280.jpg" 
                alt="picture"
                />
    
            <h4 className="post-text"><strong>username:</strong> comment</h4>

            
        </div>
    )
}

export default Post
