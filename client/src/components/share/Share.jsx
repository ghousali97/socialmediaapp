import "./share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axiosInstance from "../../axios";

const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const { user } = useContext(AuthContext);

    function handleShare(event) {
        event.preventDefault();
        axiosInstance.post('/post/', { "desc": desc }).then((res) => {
            setDesc("");
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={"/upload/" + user.profilePic} alt="" />
                        <input
                            type="text"
                            placeholder={`What's on your mind ${user.name}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleShare} >Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;