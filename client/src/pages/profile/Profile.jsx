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


function Profile() {

    return (
        <div className="home">
            <Topbar />
            <div className="homeContainer" style={{ display: 'flex' }}>
                <Leftbar />
                <div className="center" style={{ flex: 25 }}>
                    <div className="profile">
                        <div className='images'>
                            <img src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt=""
                                className='cover'
                            />
                            <img
                                src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
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
                                <span>Ghous Ali Khan</span>
                                <div className="info">
                                    <div className="item">
                                        <PlaceIcon />
                                        <span>USA</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>lama.dev</span>
                                    </div>
                                </div>
                                <button>follow</button>
                            </div>
                            <div className='right'>
                                <EmailOutlinedIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        <Posts />
                    </div>
                </div>
                <RightBar />
            </div>

        </div>
    );
}



export default Profile;

