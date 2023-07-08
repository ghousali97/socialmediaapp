import Leftbar from "../../components/leftbar/Leftbar";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/rightbar";
import Share from "../../components/share/Share";
import Stories from "../../components/stories/Stories";
import Topbar from "../../components/topbar/Topbar";
import './home.css';


function Home() {
    return (
        <div className="home">
            <Topbar />
            <div className="homeContainer" style={{ display: 'flex' }}>
                <Leftbar />
                <div className="center" style={{ flex: 26 }}>
                    <Stories />
                    <Share />
                    <Posts />
                </div>
                <RightBar />
            </div>

        </div>
    );
}

export default Home;

