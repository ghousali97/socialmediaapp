import './post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useState } from 'react';
import Comments from '../comments/Comments';
function Post({ post }) {
    const isLiked = true;

    const [showComments, setShowComments] = useState(false);

    return (
        <div className="post">
            <div className="top">
                <div className="user">
                    <img src={post.profilePic} alt=""></img>
                    <div className="userInfo">
                        <p>{post.name} </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="topIcon">
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="body">
                <div className='postDesc'>
                    {post.desc && post.desc}
                </div>
                {post.img && <img src={post.img} alt="" />}

            </div>
            <div className="bottom">
                <div className='bottomIcons'>
                    {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    <p>12 Likes</p>
                </div>
                <div className='bottomIcons' onClick={() => {
                    setShowComments(!showComments);
                }}>
                    <TextsmsOutlinedIcon />
                    <p>20 Comments</p>
                </div>
                <div className='bottomIcons'>
                    <ShareOutlinedIcon />
                    <p>Share</p>
                </div>

            </div>
            {showComments &&
                <div className='comments'>
                    <Comments />
                </div>}
        </div>
    )
}

export default Post;