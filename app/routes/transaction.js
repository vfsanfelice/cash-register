const Transaction = require('../models/transaction');

// find all documents
const find = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500, 'ERROR GETTING TRANSACTIONS');
    }
};

module.exports = {
    find
};