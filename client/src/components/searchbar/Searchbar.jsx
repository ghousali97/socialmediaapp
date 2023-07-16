import React, { useEffect, useState } from 'react';
import './searchbar.css';
import SearchbarResult from '../searchbarresult/SearchbarResult';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axiosInstance from '../../axios';


function Searchbar() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchError, setSearchError] = useState(false);

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchInput(value);

    }

    useEffect(() => {

        if (searchInput !== "") {
            axiosInstance.get('/user/search?q=' + searchInput).then((res) => {
                if (res.status === 200) {
                    setSearchError(false);
                    setSearchResult(res.data);
                } else {
                    setSearchError(true);
                    setSearchResult([]);
                }
            }).catch((err) => {
                setSearchError(true);
                setSearchResult([]);
            });
        }
        else {

            setSearchError(false);
            setSearchResult([]);
        }
    }, [searchInput]);

    return <div className="searchbar">
        <div className='inputContainer'>
            <SearchOutlinedIcon className='searchIcon' />
            <input placeholder='search' type="text" onChange={handleSearchInput} value={searchInput} />
        </div>
        <SearchbarResult searchResults={searchResults} searchError={searchError} />
    </div>
}

export default Searchbar