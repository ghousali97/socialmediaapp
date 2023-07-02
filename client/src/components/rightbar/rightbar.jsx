
import { useContext } from 'react';
import './rightbar.css';
import { AuthContext } from '../../context/authContext';

function RightBar() {


    return (
        <div className="rightbar">
            <div className='container'>
                <div className='section'>
                    <span>Suggestions For You</span>
                    <div className='item friendSuggestion'>
                        <div className='user'>
                            <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                            <span>John Doe</span>

                        </div>
                        <div className='suggestionButton'>
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>

                    </div>
                    <div className='item friendSuggestion'>
                        <div className='user'>
                            <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                            <span>John Doe</span>

                        </div>
                        <div className='suggestionButton'>
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>

                    </div>
                </div>
                <div className='section'>
                    <span>Latest Activities</span>
                    <div className='item activities'>
                        <div className='user'>
                            <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                            <span>John Doe</span>
                        </div>
                        <div className='activity'><span>changed their cover picture</span></div>
                        <div className='timestamp'><span>10 min ago</span></div>
                    </div>
                    <div className='item activities'>
                        <div className='user'>
                            <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                            <span>John Doe</span>
                        </div>
                        <div className='activity'><span>changed their cover picture</span></div>
                        <div className='timestamp'><span>3 hours ago</span></div>
                    </div>
                    <div className='item activities'>
                        <div className='user'>
                            <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                            <span>John Doe</span>
                        </div>
                        <div className='activity'><span>changed their cover picture and also sent you a message!</span></div>
                        <div className='timestamp'><span>1 min ago</span></div>
                    </div>


                </div>
                <div className='section'>
                    <span>Online Friends</span>
                    <div className='item onlineFriends'>
                        <div className='user'>
                            <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                            <span>John Doe</span>
                        </div>
                        <div className='onlineStatus'></div>
                    </div>
                    <div className='item onlineFriends'>
                        <div className='user'>
                            <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                            <span>John Doe</span>
                        </div>
                        <div className='onlineStatus'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default RightBar;