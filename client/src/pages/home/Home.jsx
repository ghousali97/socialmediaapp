import Leftbar from "../../components/leftbar/Leftbar";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/rightbar";
import Topbar from "../../components/topbar/Topbar";
import './home.css';


function Home() {
    return (
        <div className="home">
            <Topbar />
            <div className="homeContainer">
                <Leftbar />
                <div className="center">
                    <Posts />
                </div>
                <RightBar />
            </div>

        </div>
    );
}

export default Home;

