// SETUP
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// ROUTES
app.get('/', (req, res) => {
    res.json({message: 'Server is working fine.'});
});

app.use((req, res, next) => {
    next();
});

//User API
const User = require('./app/models/user');

// List all users
app.get('/user',  function user(req, res) {
    User.find(function getUser(err, users) {
        if (err) {
            res.status(500, 'ERROR FINDING USERS');
        }
        res.json(users);
    })
});

// Create a new user
app.post('/user', function user(req, res) {
    const loadUser = req.body;

    User.create(loadUser, function createUser(err, addUser) {
        if (err) {
            res.status(500, 'ERROR CREATING USER');
        }
        res.json(addUser);
    });
});

// Do Login with user information
app.post('/login',  function login(req, res) {
    var userInfo = req.body;
    
    User.findOne( {'username' : userInfo.username, 'password': userInfo.password }, function getUser(err, user) {
        if (err || !user) {
            res.status(422, 'Invalid Login');
        }
        res.json(user);
    })
});

//Transaction API
const Transaction = require('./app/models/transaction');

// Total on the last 30 days
app.get('/month',  function transaction(req, res) {
    var time = new Date().getTime() - 30*24*60*60*1000;
    Transaction.aggregate([
        {
            $match: {
                transactionDate: {$gt: new Date(time)}
            } 
        },
        {
            $group: {
                _id: null,
                count: {$sum: '$amount'}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

// Total today
app.get('/today',  function transaction(req, res) {
    var time = new Date().getTime() - 1*24*60*60*1000;
    Transaction.aggregate([
        {
            $match: {
                transactionDate: {$gt: new Date(time)}
            } 
        },
        {
            $group: {
                _id: null,
                count: {$sum: '$amount'}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
});

// List all transactions
app.get('/transaction',  function transaction(req, res) {
    Transaction.find(function getTransaction(err, transactions) {
        if (err) {
            res.status(500, 'ERROR FINDING TRANSACTIONS');
        }
        res.json(transactions);
    })
});

// Create a new transaction
app.post('/transaction', function newTransaction(req, res) {
    const loadTransaction = req.body;

    Transaction.create(loadTransaction, function createTransaction(err, newTransact) {
        if (err) {
            res.status(500, 'error creating transaction');
        }
        res.json(newTransact);
    });
});

// Delete one transaction
app.delete('/transaction/:_id', function delTransaction(req, res) {
    const query = {_id: req.params._id };
    Transaction.remove(query, function deleteTransaction(err, remTransact) {
        if (err) {
            res.status(500, 'ERROR DELETE TRANSACTION');
        }
        res.json(remTransact);
    })
});

// Update one transaction
app.put('/transaction/:_id', function transaction(req, res){
    const currentTransaction = req.body;
    const query = req.params._id;
    const update = {
        '$set': {
            description: currentTransaction.description,
            amount: currentTransaction.amount,
            paymentType: currentTransaction.paymentType,
        },
    };
    const options = {new: true};

    Transaction.findOneAndUpdate(query, update, options, function updateTransaction(err, transactions){
        if (err) {
            res.status(500, 'error updating user');
        }
        res.json(transactions);
    })
})


// Load index.html file
app.get('/app/*', (req, res) => {
    console.log('angular route');
    res.sendFile('./public/initial.html', {root: __dirname});
});

// Start server
app.listen(port, err => { 
    if (err) {
         console.log(err);
    }

    console.log('API Server is listening on http://localhost:8080');
});