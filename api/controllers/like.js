const db = require('../utils/db');
const moment = require('moment');


module.exports.getLikes = (req, res) => {
    const postId = req.query.postId;
    const search_query = 'SELECT *  FROM likes where likedPostId = ?';

    db.query(search_query, [postId], (err, search_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        likedUsers = search_results.map((like) => {
            return like.likedUserId
        })
        return res.status(200).json(likedUsers);
    })
}

module.exports.deleteLike = (req, res) => {
    const userId = req.user.id;
    const postId = req.query.postId;
    const delete_query = "Delete from likes where likedPostId = ? AND likedUserId=?"

    db.query(delete_query, [postId, userId], (err, delete_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json({ affectedPost: postId });
    })
}
module.exports.createLike = (req, res) => {
    const userId = req.user.id;
    const postId = req.query.postId;
    const insert_query = "INSERT INTO likes (likedPostId, likedUserId) SELECT ?,? WHERE NOT EXISTS (SELECT * FROM likes where  likedPostId = ? AND likedUserId=?)";

    db.query(insert_query, [postId, userId, postId, userId], (err, insert_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json({ affectedPost: postId });
    })
}