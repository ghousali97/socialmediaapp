import { useContext } from 'react';
import './comments.css';
import { AuthContext } from '../../context/authContext';


const Comments = () => {

    const { user } = useContext(AuthContext);
    //Temporary
    const comments = [
        {
            id: 1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            name: "John Doe",
            userId: 1,
            profilePicture:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            name: "Jane Doe",
            userId: 2,
            profilePicture:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
    ];

    return (
        <div className='comments'>
            <div className='write'>
                <img alt="" src={user.img} />
                <input name="myComment" placeholder='Write your comment ... ' />
                <button>Send</button>
            </div>
            {
                comments.map((comment) => {
                    return (
                        <div className='comment'>
                            <div className='user'>
                                <img alt="" src={comment.profilePicture} />
                            </div>
                            <div className='info'>
                                <div className='centre'>
                                    <span className='username'>
                                        {comment.name}
                                    </span>
                                    <p className='commentdescription'>
                                        {comment.desc}
                                    </p>
                                </div>
                                <div className='right'>
                                    <p>1 hour ago</p>

                                </div>
                            </div>


                        </div>
                    )
                })
            }

        </div>
    )


}

export default Comments;