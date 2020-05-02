// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
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
const port = 3000
const server = app.listen(port, callback());
// Callback to debug
function callback() {
    console.log(`Server is running on ${port}`);
}
// Initialize all route with a callback function
app.get('/all', callbackget);
// Callback function to complete GET '/all'
function callbackget(req, res) {
    console.log('data sent')
    res.send(projectData);
};
// Post Route

app.post('/add', cb_post);

function cb_post(req, res) {
    const newData = req.body;
    let newEntry = {
        long: newEntry.geonames['0'].lng,
        lat: newEntry.geonames['0'].lat,
        country: newEntry.geonames['0'].countryName
    }
    projectData = newEntry;
};