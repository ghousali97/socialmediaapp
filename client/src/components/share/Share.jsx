import "./share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axiosInstance from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (postData) => {
            return axiosInstance.post('/post', postData)
        },
        onSuccess: response => {
            setDesc("");
            setFile(null);
            queryClient.invalidateQueries("posts");

        }
    })

    //upload image before you upload the data. 
    const upload = async (req, res) => {
        try {
            var formData = new FormData();
            formData.append("file", file);
            //your upload end point returns the file name which will be used to search for the file
            const res = await axiosInstance.post('/upload', formData);

            return res.data;
        } catch (err) {
            console.log(err);
        }


    }
    async function handleShare(event) {
        event.preventDefault();
        let imgUrl = file ? await upload() : "";
        mutation.mutate({ desc: desc, img: imgUrl });

    }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={process.env.REACT_APP_BACKEND_HOST_PUBLIC + '/upload/' + user.profilePic} alt="" />
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