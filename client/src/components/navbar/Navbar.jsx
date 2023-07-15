import React, { useContext, useState } from 'react';
import './navbar.css';
import { AuthContext } from '../../context/authContext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { DarkModeContext } from '../../context/darkModeContext';
import axiosInstance from '../../axios';


function Navbar({ menuOpen, setMenuOpen }) {

    const { user, logout } = useContext(AuthContext);
    const { darkMode, toggle } = useContext(DarkModeContext);
    const [searchInput, setSearchInput] = useState('');
    const [searchOpen, toggleSearchOpen] = useState(false);


    async function handleSearchInput(event) {
        const value = event.target.value;
        setSearchInput(value);
        axiosInstance.get('/user/search?q=' + value).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });


    }

    return <div className={"navbar " + (menuOpen && "active")}>
        <div className='left'>
            <div className='logo'><span>
                Fakebook!
            </span>
            </div>
            <div className='topbarIcon mobileOff'>
                <a href="/">  <HomeOutlinedIcon /></a>
            </div>
            <div className='topbarIcon mobileOff' onClick={toggle}>
                {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </div>
            <div className='searchContainer'>
                <SearchOutlinedIcon className='searchIcon' />
                <input placeholder='search' type="text" onChange={handleSearchInput} value={searchInput} />
            </div>
            <div className={'searchContainerMobile topbarIcon ' + (searchOpen && 'active')}>
                <SearchOutlinedIcon className='searchIcon' onClick={() => { toggleSearchOpen(!searchOpen) }} />
            </div>

        </div>
        <div className='right'>
            <div className='topbarIcon mobileOn'>
                <a href="/">  <HomeOutlinedIcon /></a>
            </div>
            <div className='topbarIcon mobileOn' onClick={toggle}>
                {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </div>
            <div className='topbarIcon mobileOn'>
                <GridViewOutlinedIcon />
            </div>

            <div className='topbarIcon mobileOn'>
                <a href={"/profile/" + user.id}>  <PersonOutlineOutlinedIcon /></a>
            </div>
            <div className='topbarIcon mobileOn' onClick={() => { logout() }}>
                <LogoutIcon />
            </div>
            <div className='topbarIcon mobileOff'>
                <GridViewOutlinedIcon />
            </div>

            <div className='user mobileOff'>
                <img src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + user.profilePic}
                    alt="" />
                <div className='username'>
                    <a href={"/profile/" + user.id}>{user.username}</a>
                </div>
            </div>
        </div>
    </div>
}

export default Navbar;