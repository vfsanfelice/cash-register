const User = require('../models/user');

const find = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500, 'ERROR LOADING USERS');
    }
};

module.exports = {
    find
};