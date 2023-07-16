const passwordUtils = require('../utils/password-utils');
const db = require("../utils/db");


module.exports.healthcheck = (req, res) => {
    res.json({
        message: "Hello world from Users"
    })
}

module.exports.getUser = (req, res) => {
    const userId = req.params.userId;
    const search_query = "SELECT * FROM users where id=? LIMIT 1";
    db.query(search_query, [userId], (err, search_result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: true, message: "Internal server error!" });
        }
        if (!search_result.length) return res.status(404).json({ error: "User doesn't exist" });

        const { salt, hash, ...return_user } = search_result[0]
        return res.status(200).json(return_user);
    });


}

module.exports.getUserByQuery = (req, res) => {
    const q = req.query.q;
    console.log(q);
    if (q === "") {
        return res.status(404).json({ error: "User doesn't exist" });

    }
    const search_params = '%' + q + '%';
    const search_query = 'SELECT * FROM users WHERE name LIKE ? OR username LIKE ? ';
    db.query(search_query, [search_params, search_params], (err, search_result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: true, message: "Internal server error!" });
        }
        console.log(search_result)

        if (!search_result.length) return res.status(404).json({ error: "User doesn't exist" });
        const return_users = search_result.map((user) => {
            const { name, city, id } = user;
            return return_user = { id, name, city }
        })
        return res.status(200).json(return_users);
    });


}
module.exports.getUserByToken = (req, res) => {
    const userId = req.user.id;
    const search_query = "SELECT * FROM users where id=? LIMIT 1";
    db.query(search_query, [userId], (err, search_result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: true, message: "Internal server error!" });
        }
        if (!search_result.length) return res.status(404).json({ error: "User doesn't exist" });

        const { salt, hash, ...return_user } = search_result[0]
        return res.status(200).json(return_user);
    });


}

module.exports.getAllUsers = (req, res) => {
    const search_query = "SELECT * FROM users";
    db.query(search_query, (err, search_result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: true, message: "Internal server error!" });
        }

        return res.status(200).json(search_result);

    }
    );


}


module.exports.register = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const coverPic = req.body.coverPic;
    const profilePic = req.body.profilePic;
    const city = req.body.city;
    const website = req.body.website;



    if (!email || !password || !name || !username) {
        return res.status(400).json({ error: "email, username, name and password are required" });
    }



    const search_q = "SELECT * FROM users where email=? OR username=?";
    db.query(search_q, [email, username], (err, search_result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: true, message: "Internal server error!" });
        }
        if (search_result.length) return res.status(400).json({ error: "Email / Username already exists" });

        try {
            saltHash = passwordUtils.generatePassword(password);
            const insert_q = "INSERT INTO users (username,name,email,salt,hash, coverPic, profilePic, city,website) VALUES(?,?,?,?,?,?,?,?,?)";

            db.query(insert_q, [username, name, email, saltHash.salt, saltHash.hash, coverPic, profilePic, city, website], (err, insert_result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: true, message: "Internal server error!" });
                }

                return res.status(200).json(insert_result);

            })


        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });

        }
    })





}

module.exports.updateUser = (req, res) => {
    const userId = req.user.id;
    const password = req.body.password;
    const newPassword = req.body.newPassword

    var coverPic = req.body.coverPic;
    var profilePic = req.body.profilePic;
    var city = req.body.city;
    var website = req.body.website;
    var name = req.body.name;
    var email = req.body.email;


    const search_query = "SELECT * FROM users where id=? LIMIT 1";
    db.query(search_query, [userId], (err, search_result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: true, message: "Internal server error!" });
        }
        if (!search_result.length) return res.status(404).json({ error: "User doesn't exist" });

        if (password && newPassword) {
            if (!passwordUtils.validatePassword(password, search_result[0].hash, search_result[0].salt)) return res.status(401).json({ error: true, message: "Invalid email or password!" });

            saltHash = passwordUtils.generatePassword(newPassword);
            const update_password_query = 'Update users SET salt=?, hash=? where id=?';
            db.query(update_password_query, [saltHash.salt, saltHash.hash, userId], (err, update_result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: true, message: "Internal server error!" });
                }

                return res.status(200).json(update_result);
            });

        } else {

            city = city ? city : search_result[0].city;
            coverPic = coverPic ? coverPic : search_result[0].coverPic;
            profilePic = profilePic ? profilePic : search_result[0].profilePic;
            website = website ? website : search_result[0].website;
            name = name ? name : search_result[0].name;
            email = email ? email : search_result[0].email;
            update_query = 'Update users SET coverPic=?,profilePic=?,city=?,website=?,name=?,email=? WHERE id=?';
            db.query(update_query, [coverPic, profilePic, city, website, name, email, userId], (err, update_results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: true, message: "Internal server error!" });
                }

                return res.status(200).json(update_results);
            });
        }




    });


}

