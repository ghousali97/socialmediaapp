import { useContext, useState } from 'react';
import './comments.css';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../axios';
import ProgressWidget from '../progresswidget/ProgressWidget';


const Comments = ({ postId }) => {

    const { user } = useContext(AuthContext);
    const [newComment, setNewComment] = useState("");

    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments', postId], //define the name of query yourself
        exact: true,
        queryFn: () =>
            axiosInstance.get('/comment?postId=' + postId).then(
                (res) => {
                    return res.data
                }

            ),
    })
    const mutation = useMutation({
        mutationFn: (postData) => {
            return axiosInstance.post('/comment', postData)
        },
        onSuccess: response => {
            setNewComment("");
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            queryClient.invalidateQueries({ queryKey: ["commentCount", postId] });

        }
    })
    function sendComment(event) {
        event.preventDefault();
        mutation.mutate({ desc: newComment, postId: postId });
    }

    //Temporary
    // const comments = [
    //     {
    //         id: 1,
    //         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //         name: "John Doe",
    //         userId: 1,
    //         profilePicture:
    //             "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 2,
    //         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //         name: "Jane Doe",
    //         userId: 2,
    //         profilePicture:
    //             "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     },
    // ];

    return (
        <div className='comments'>
            {(mutation.isLoading || mutation.isError) ? <ProgressWidget /> :
                <div className='write'>
                    <img alt="" src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + user.profilePic} />
                    <input name="myComment" placeholder='Write your comment ... ' value={newComment} onChange={(e) => {
                        setNewComment(e.target.value);
                    }
                    } />
                    <button onClick={sendComment}>Send</button>

                </div>}

            {isLoading ? <ProgressWidget /> : (error ? <p>Something is wrong </p> : data.map((comment) => {
                return (
                    <div className='comment'>
                        <div className='user'>
                            <img alt="" src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + comment.profilePic} />
                        </div>
                        <div className='info'>
                            <div className='centre'>
                                <span className='username'>
                                    {comment.name}
                                </span>
                                <p className='commentdescription'>
                                    {comment.description}
                                </p>
                            </div>
                            <div className='right'>
                                <p>1 hour ago</p>

                            </div>

                        </div>

                    </div>

                )
            }))

            }



        </div>
    )


}

export default Comments;