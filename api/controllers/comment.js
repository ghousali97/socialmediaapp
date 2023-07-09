const db = require('../utils/db');
const moment = require('moment');


module.exports.getAllComment = (req, res) => {

    //  const search_query = 'SELECT p.*,u.id as userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC';

    const search_query = 'SELECT c.*, name,profilePic from comments AS c JOIN users as u ON (u.id = c.userId)';
    db.query(search_query, (err, search_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json(search_results);
    })
}

module.exports.getCommentByPost = (req, res) => {
    const postId = req.query.postId;
    if (!postId) return res.status(400).json({ message: "Post Id is required" });
    const search_query = 'SELECT c.*, name,profilePic from comments AS c JOIN users as u ON (u.id = c.userId) where postId = ?';

    db.query(search_query, [postId], (err, search_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json(search_results);
    })
}

module.exports.createComment = (req, res) => {
    const userId = req.user.id;
    const description = req.body.desc;
    const postId = req.body.postId;
    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");


    if (!(description && postId)) {
        return res.status(400).json({ message: "PostId and description is required" });
    }

    const insert_query = "INSERT into comments(description,postId,userId) VALUES(?,?,?) ";

    db.query(insert_query, [description, postId, userId], (err, insert_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(201).json(insert_results);

    })
}