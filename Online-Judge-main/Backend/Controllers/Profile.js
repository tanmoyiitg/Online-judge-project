const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')


const Profile = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        const user = { id: decoded.id, username: decoded.email, roles: decoded.roles };
        res.json({ user });
    });
}

const Logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
    res.json({ message: 'Logout successful' });
}

module.exports = { Profile, Logout }