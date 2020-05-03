const dotenv = require('dotenv');
dotenv.config();

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
const fetch = require('node-fetch');
// Spin up the server
const port = 8081
const server = app.listen(port, callback());
// Callback to debug
function callback() {
    console.log(`Server is running on ${port}`);
}

let weather_bit_api_key = process.env.weather_bit_api


const getdata = async(baseurl) => {
    const res = await fetch(baseurl)

    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (e) {
        console.log("error", e);
    }
};
let geoname_data = {};
let weatherbit_data = {};
let client_data = {};

function geoname(query) {
    const baseurl = `http://api.geonames.org/searchJSON?q=${query}&maxRows=1&username=sandeep2194`;
    getdata(baseurl).then((data) => {
        weatherbit_data = data;
    });
};

function weatherbit(query) {
    const baseurl = `http://api.weatherbit.io/v2.0/forecast/days=${client_data.days_to_travelday}&key=${weather_bit_api_key}`;
    getdata(baseurl).then((data) => {
        geoname_data = data;
    });
};
app.get('/all', callbackget);
// Callback function to complete GET '/all'
function callbackget(req, res) {
    res.send(geoname_data);
    res.end()
};

app.post('/add', cb_post);


function cb_post(req, res) {
    client_data = req.body;
    console.log('The City is ' + city)
    geoname(client_data.city);
};