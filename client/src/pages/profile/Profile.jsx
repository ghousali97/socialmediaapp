import Leftbar from '../../components/leftbar/Leftbar';
import Posts from '../../components/posts/Posts';
import RightBar from '../../components/rightbar/rightbar';
import Topbar from '../../components/topbar/Topbar';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import './profile.css'
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';
import Share from '../../components/share/Share';


function Profile() {
    const [openUpdate, setOpenUpdate] = useState(false);
    const profileUserId = parseInt(useLocation().pathname.split("/")[2]);
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);

    const { isLoading: isLoadingProfile, error: errorProfile, data: dataProfile } = useQuery({
        queryKey: ['userProfile'], //define the name of query yourself
        queryFn: () =>
            axiosInstance.get('/user/find/' + profileUserId).then(
                (res) => res.data,
            ),
    })

    const { isLoading: isLoadingRelationship, error: errorRelationship, data: dataRelationship } = useQuery({
        queryKey: ['relationship'], //define the name of query yourself
        exact: true,
        queryFn: () =>
            axiosInstance.get('/relationship?profileId=' + profileUserId).then(
                (res) => res.data,
            ),
    })
    const relationshipMutation = useMutation({
        mutationFn: (following) => {
            if (following) return axiosInstance.delete('/relationship?profileId=' + profileUserId);
            return axiosInstance.post('/relationship?profileId=' + profileUserId)
        },

        onSuccess: response => {
            queryClient.invalidateQueries(['relationship']);
        }
    })

    function handleFollow() {
        relationshipMutation.mutate(dataRelationship.includes(user.id))
    }

    return (
        <div className="home">
            <Topbar />
            <div className="homeContainer" style={{ display: 'flex' }}>
                <Leftbar />

                <div className="center" style={{ flex: 25 }}>
                    {isLoadingProfile || errorProfile ? <p> Loading!</p> :

                        <div className="profile">

                            <div className='images'>
                                <img src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + dataProfile.coverPic}
                                    alt=""
                                    className='cover'
                                />
                                <img
                                    src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + dataProfile.profilePic}
                                    alt=""
                                    className="profilePic"
                                />
                            </div>

                            <div className='profileContainer'>
                                <div className='left'>
                                    <a href="http://facebook.com">
                                        <FacebookTwoToneIcon fontSize="medium" />
                                    </a>
                                    <a href="http://facebook.com">
                                        <InstagramIcon fontSize="medium" />
                                    </a>
                                    <a href="http://facebook.com">
                                        <TwitterIcon fontSize="medium" />
                                    </a>
                                    <a href="http://facebook.com">
                                        <LinkedInIcon fontSize="medium" />
                                    </a>
                                    <a href="http://facebook.com">
                                        <PinterestIcon fontSize="medium" />
                                    </a>
                                </div>
                                <div className='center'>
                                    <span>{dataProfile.name}</span>
                                    <div className="info">
                                        <div className="item">
                                            <PlaceIcon />
                                            <span>{dataProfile.city ? dataProfile.city : "Unknown"}</span>
                                        </div>
                                        <div className="item">
                                            <LanguageIcon />
                                            <span>{dataProfile.website ? dataProfile.website : "Unknown"}</span>
                                        </div>
                                    </div>
                                    {user.id === profileUserId ? <button onClick={() => setOpenUpdate(true)}>Update</button> :
                                        (isLoadingRelationship || errorRelationship ? <p>Loading</p> :
                                            (dataRelationship.includes(user.id) ? <button style={{ backgroundColor: 'red' }} onClick={handleFollow}>Unfollow</button> : <button onClick={handleFollow}>Follow</button>)
                                        )
                                    }

                                </div>


                                <div className='right'>
                                    <EmailOutlinedIcon />
                                    <MoreVertIcon />
                                </div>
                                {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={dataProfile} />
                                } </div>

                        </div>
                    }
                    <Share />
                    <Posts myPost={true} />

                </div>
                <RightBar />
            </div>

        </div>
    );
}



export default Profile;

