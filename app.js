
// SETUP
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES
app.use((req, res, next) => {
    console.log('Something is happening');
    next();
});

app.get('/', (req, res) => {
    res.json({message: 'welcome to api! motherfucker'});
});

//User
const user = require('./app/routes/user');
app.get('/user', user.find);

//Transaction
const transaction = require('./app/routes/transaction');
app.get('/transaction', transaction.find);

//app.delete('/transaction/:id', transaction.remove);

/*
app.post
app.del
app.put */

// Start server
app.listen(port, err => { 
    if (err) {
         console.log(err);
    }

    console.log('API Server is listening on http://localhost:8080');
});