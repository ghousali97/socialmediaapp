import './post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useContext, useState } from 'react';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../axios';
import { AuthContext } from '../../context/authContext';



function Post({ post, key }) {


    const [showComments, setShowComments] = useState(false);
    const { user } = useContext(AuthContext);


    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ['likes', post.id],
        exact: true,
        queryFn: () =>

            axiosInstance.get('/like?postId=' + post.id).then(
                (res) => {
                    return res.data
                }

            )
        ,
    })

    const likeMutation = useMutation({
        mutationFn: (liked) => {
            if (liked) return axiosInstance.delete('/like?postId=' + post.id);
            return axiosInstance.post('/like?postId=' + post.id)
        },
        onSuccess: response => {

            queryClient.invalidateQueries(['likes', post.id]);

        }
    })

    function handleLike() {
        likeMutation.mutate(data.includes(user.id));
    }


    return (
        <div className="post">
            <div className="top">
                <div className="user">
                    <img src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + post.profilePic} alt="" />
                    <div className="userInfo">
                        <a href={"/profile/" + post.userId}><p>{post.name}</p></a>
                        <span>{moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
                <div className="topIcon">
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="body">
                <div className='postDesc'>
                    {post.description && post.description}
                </div>
                {post.img && <img src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + post.img} alt="" />}

            </div>
            <div className="bottom">
                <div className='bottomIcons' onClick={handleLike}>
                    {(!isLoading && !error) && data.includes(user.id) ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}

                    <p>{(!isLoading && !error) && data.length} Likes</p>
                </div>
                <div className='bottomIcons' onClick={() => {
                    setShowComments(!showComments);
                }}>
                    <TextsmsOutlinedIcon />
                    <p>0 comment</p>
                </div>
                <div className='bottomIcons'>
                    <ShareOutlinedIcon />
                    <p>Share</p>
                </div>

            </div>
            {showComments &&
                <div className='comments'>
                    <Comments postId={post.id} />
                </div>}
        </div>
    )
}

export default Post;