const db = require('../utils/db');
const moment = require('moment');


module.exports.getAllPost = (req, res) => {
    const search_query = 'SELECT p.*,u.id as userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)';

    db.query(search_query, (err, search_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json(search_results);
    })
}

module.exports.getTimelinePost = (req, res) => {
    const userId = req.user.id;
    const search_query = 'SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) JOIN relationships AS r ON (p.userId = r.followedUserId AND r.followingUserId = ?)';

    db.query(search_query, [userId], (err, search_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json(search_results);
    })
}

module.exports.createPost = (req, res) => {
    const userId = req.user.id;
    const description = req.body.desc;
    const img = req.body.img;
    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");


    if (!(description || img)) {
        return res.status(400).json({ message: "Image or description is required" });
    }

    const insert_query = "INSERT into posts(description,img,userId,createdAt) VALUES(?,?,?,?)";

    db.query(insert_query, [description, img, userId, createdAt], (err, insert_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(201).json(insert_results);

    })
}