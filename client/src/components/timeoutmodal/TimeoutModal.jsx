import React, { useEffect, useRef } from 'react';
import './timeoutmodal.css';

const TimeoutModal = ({ showModal, togglePopup, handleStayLoggedIn }) => {

    const modalRef = useRef();

    useEffect(() => {
        if (!showModal) {
            modalRef.current.style.display = 'none';
        } else {
            modalRef.current.style.display = 'flex';
        }
    }, [showModal])
    return <div className='timeoutmodal' ref={modalRef}>
        <div className='modalContainer'>
            <div className='top'></div>
            <div className='border'>
                <span>You will be redirected in 5 seconds</span>
            </div>
            <div className='bottom'>
                <button onClick={handleStayLoggedIn}> Stay logged in</button>
            </div>
        </div>
    </div>
}

export default TimeoutModal;