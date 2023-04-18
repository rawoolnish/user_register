var jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    //get the user from the jwt token and add it to the req obj
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }
}
module.exports = fetchUser;