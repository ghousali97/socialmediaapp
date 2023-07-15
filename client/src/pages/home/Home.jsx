import Leftbar from "../../components/leftbar/Leftbar";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/rightbar";
import Share from "../../components/share/Share";
import Navbar from "../../components/navbar/Navbar";
import './home.css';


function Home() {




    return (
        <div className="home">
            <Navbar />
            <div className="homeContainer" style={{ display: 'flex' }}>
                <Leftbar />
                <div className="center" style={{ flex: 26 }}>
                    <Share />
                    <Posts />
                </div>
                <RightBar />
            </div>

        </div>
    );
}

export default Home;

