// Import mongoose
const mongoose = require('mongoose');
const db = require('../db');

// Define Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userType: String
});

const User = db.model('user', userSchema);

module.exports = User;