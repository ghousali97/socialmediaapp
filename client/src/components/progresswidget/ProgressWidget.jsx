import React from 'react';
import './progresswidget.css';
import CircularProgress from '@mui/material/CircularProgress';


function ProgressWidget() {
    return <div className='progressWidget'>
        <CircularProgress />
    </div>
}

export default ProgressWidget;