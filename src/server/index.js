const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyparser = require('body-parser');
/* Middleware*/
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('../../dist'));

// Spin up the server
const port = 8081
const server = app.listen(port, callback());
// Callback to debug
function callback() {
    console.log(`Server is running on ${port}`);
}

let data = {}
app.get('/all', callbackget);
// Callback function to complete GET '/all'
function callbackget(req, res) {
    res.send(data)
    res.end()
};

app.post('/add', cb_post);

function cb_post(req, res) {
    data = req.body;
    console.log(data)
    res.send({})
    res.end();

};