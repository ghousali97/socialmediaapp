const passwordUtils = require('../utils/password-utils');

const isAuthenticated = (req, res, next) => {
    const accessCookie = req.cookies['accessToken'];
    const token = accessCookie?.token;

    if (!token) return res.status(401).json();
    try {
        const payload = passwordUtils.verifyJwt(token);
        const user = { id: payload.sub, username: payload.username };
        req.user = user;
        console.log(user);
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid or expired token" });
    };

};

module.exports.isAuthenticated = isAuthenticated;

