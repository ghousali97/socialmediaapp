const db = require('../utils/db');
const moment = require('moment');


module.exports.getRelationship = (req, res) => {
    const profileId = req.query.profileId;
    const search_query = 'SELECT *  FROM relationships where followedUserId = ?';

    db.query(search_query, [profileId], (err, search_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        followingUsers = search_results.map((relationship) => {
            return relationship.followingUserId
        })
        return res.status(200).json(followingUsers);
    })
}

module.exports.deleteRelationship = (req, res) => {
    const userId = req.user.id;
    const profileId = req.query.profileId;
    const delete_query = "Delete from relationships where followingUserId = ? AND followedUserId=?"

    db.query(delete_query, [userId, profileId], (err, delete_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json({ affectedProfile: profileId });
    })
}
module.exports.createRelationship = (req, res) => {
    const userId = req.user.id;
    const profileId = req.query.profileId;
    if (!profileId) return res.status(400).json();
    const insert_query = "INSERT INTO relationships (followingUserId, followedUserId) SELECT ?,? WHERE NOT EXISTS (SELECT * FROM relationships where  followedUserId = ? AND followingUserId=?)";

    db.query(insert_query, [userId, profileId, profileId, userId], (err, insert_results) => {
        if (err) {
            console.log(err); return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(200).json({ affctedProfile: profileId });
    })
}