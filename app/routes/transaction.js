const Transaction = require('../models/transaction');

const find = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500, 'ERROR GETTING TRANSACTIONS');
    }
};

/* const remove = async (req, res) => {
    try {
        const id = req.params.id;
        Transaction.remove(query, removeTransaction(err, removedTransaction) => {

        });
        res.json(removedTransaction);
    } catch (err) {
        res.status(500, 'Error deleting transaction');
    }
} */

module.exports = {
    find
};