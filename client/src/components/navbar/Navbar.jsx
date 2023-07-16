import React, { useContext, useRef, useState } from 'react';
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
import Searchbar from '../searchbar/Searchbar';
import CloseIcon from '@mui/icons-material/Close';

function Navbar({ menuOpen, setMenuOpen }) {

    const { user, logout } = useContext(AuthContext);
    const { darkMode, toggle } = useContext(DarkModeContext);
    const [toggleSearch, setToggleSearch] = useState(true);

    const logoRef = useRef();
    const searchIconRef = useRef();
    const searchBarRef = useRef();
    const cancelRef = useRef();


    function handleSearch() {
        console.log('search clicked')
        setToggleSearch(!toggleSearch);

        if (toggleSearch) {
            logoRef.current.style.display = 'none';
            searchIconRef.current.style.display = 'none';

            searchBarRef.current.style.display = 'flex'
            cancelRef.current.style.display = 'flex'
        }
        else {
            logoRef.current.style.display = 'flex';
            searchIconRef.current.style.display = 'flex';

            searchBarRef.current.style.display = 'none'
            cancelRef.current.style.display = 'none'
        }

    }
    return <div className={"navbar " + (menuOpen && "active")}>
        <div className='left'>
            <div className='logo' ref={logoRef}><span>
                Fakebook!
            </span>
            </div>
            <div className='topbarIcon mobileOff'>
                <a href="/">  <HomeOutlinedIcon /></a>
            </div>
            <div className='topbarIcon mobileOff' onClick={toggle}>
                {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </div>
            <div className='topbarIcon searchIcon mobileOff'>
                <Searchbar />
            </div>
            <div className='topbarIcon searchmobileon' onClick={handleSearch} ref={searchIconRef}>
                <SearchOutlinedIcon />
            </div>
            <div className='topbarIcon searchIcon searchmobileoff' ref={searchBarRef} >
                <Searchbar />
            </div>
            <div className='topbarIcon searchmobileoff' id="cancelIcon" onClick={handleSearch} ref={cancelRef}>
                <CloseIcon />
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

            <div className='topbarIcon mobileOff'>
                <GridViewOutlinedIcon />
            </div>
            <div className='topbarIcon' onClick={() => { logout() }}>
                <LogoutIcon />
            </div>

            <div className='user mobileOff'>
                <img src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + user.profilePic}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/profile.jpeg"
                    }}
                    alt="" />
                <div className='username'>
                    <a href={"/profile/" + user.id}>{user.name}</a>
                </div>
            </div>
        </div>
    </div>
}

export default Navbar;