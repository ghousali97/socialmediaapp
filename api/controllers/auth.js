const passwordUtils = require('../utils/password-utils');
const db = require("../utils/db");


module.exports.healthcheck = (req, res) => {
    res.json({
        message: "Hello world from Auth"
    })
}


module.exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;



    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const search_q = "SELECT * FROM users where username=? LIMIT 1";
    db.query(search_q, [username], (err, search_result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: true, message: "Internal server error!" });
        }
        if (!search_result.length) return res.status(404).json({ error: "User doesn't exist" });
        const validPassword = passwordUtils.validatePassword(password, search_result[0].hash, search_result[0].salt)
        if (!validPassword) {

            return res.status(401).json({ error: true, message: "Invalid username or password!" });
        }



        try {
            jwt = passwordUtils.issueJwt(search_result[0]);
            const { salt, hash, ...user } = search_result[0];

            return res.cookie("accessToken", jwt, {
                httpOnly: true,
            })
                .status(200)
                .json({ user, accessToken: jwt });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });

        }
    })

}

module.exports.logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json();
}