import React from 'react';
import './searchbarresult.css';
const _ = require('lodash');


function SearchbarResult({ searchResults, searchError }) {
    return <div className="searchresults">
        {searchError ? (<div className='searchresult'>
            No match found
        </div>) :
            searchResults.map((result) => {
                return <a href={"/profile/" + result.id}>
                    <div className='searchresult'>
                        <div className='name'> {_.startCase(result.name)}</div>
                        <div className='city'> {_.startCase(result.city)}</div>
                    </div>
                </a>
            })}
    </div>
}

export default SearchbarResult