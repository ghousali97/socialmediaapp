import './topbar.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';


function Topbar() {




    const { darkMode, toggle } = useContext(DarkModeContext);
    const { user, logout } = useContext(AuthContext);

    return <div className="topbar">
        <div className='left'>
            <div className='logo'><span>
                Fakebook!
            </span>
            </div>
            <div className='topbarIcon'>
                <a href="/">  <HomeOutlinedIcon /></a>
            </div>
            <div className='topbarIcon' onClick={toggle}>
                {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}

            </div>
            <div className='topbarIcon'>
                <GridViewOutlinedIcon />
            </div>
            <div className='searchContainer'>

                <SearchOutlinedIcon />

                <input placeholder='search' type="text" />
            </div>
            <div className='topbarIcon menuIcon'>
                <MenuIcon />
            </div>
        </div>
        <div className='right'>
            <div className='topbarIcon' onClick={() => { logout() }}>
                <PersonOutlineOutlinedIcon />
            </div>
            <div className='topbarIcon'>
                <EmailOutlinedIcon />
            </div>
            <div className='topbarIcon'>
                <NotificationsOutlinedIcon />
            </div>
            <div className='user'>
                <img src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + user.profilePic}
                    alt="" />

                <div className='username'>
                    <a href={"/profile/" + user.id}><span>{user.username}</span></a>


                </div>
            </div>
        </div>

    </div >
}

export default Topbar;