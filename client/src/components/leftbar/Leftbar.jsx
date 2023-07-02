import './leftbar.css';

import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";



function Leftbar() {
    return (
        <div className="leftbar">
            <div className='container'>
                <div className='section'>
                    <div className='user'>
                        <img alt="" src="https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390" />
                        <span>John Doe</span>
                    </div>

                    <div className='item'>
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className='item'>
                        <img src={Market} alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className='item'>
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className='item'>
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className='section'>
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Events} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="section">
                    <span>Others</span>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <img src={Tutorials} alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt="" />
                        <span>Courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leftbar;