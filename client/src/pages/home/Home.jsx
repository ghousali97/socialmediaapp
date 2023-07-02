import Leftbar from "../../components/leftbar/Leftbar";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/rightbar";
import Topbar from "../../components/topbar/Topbar";
import './home.css';


function Home() {
    return (
        <div className="home">
            <Topbar />
            <div className="homeContainer" style={{ display: 'flex' }}>
                <Leftbar />
                <div className="center" style={{ flex: 26 }}>
                    <Posts />
                </div>
                <RightBar />
            </div>

        </div>
    );
}

export default Home;

