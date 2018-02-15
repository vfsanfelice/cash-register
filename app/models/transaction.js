// Import mongoose
const mongoose = require('mongoose');
const db = require('../db');

// Define Schema
const transactionSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    paymentType: String,
    transactionDate: { type: Date, default: Date.now }
});

const Transaction = db.model('transaction', transactionSchema);

module.exports = Transaction