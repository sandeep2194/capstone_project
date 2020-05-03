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
const dotenv = require('dotenv');
dotenv.config();

// Spin up the server
const port = 8081
const server = app.listen(port, callback());
// Callback to debug
function callback() {
    console.log(`Server is running on ${port}`);
}

let all_data = {}
let client_data = {};

const getdata = async(baseurl) => {
    const res = await fetch(baseurl)

    try {
        const data = await res.json();
        return data;
    } catch (e) {
        console.log("error", e);
    }
};

const geoname = async(query) => {
    const baseurl = `http://api.geonames.org/searchJSON?q=${query}&maxRows=1&username=sandeep2194`;
    try {
        await getdata(baseurl).then((data) => {
            all_data['geoname_d'] = data.geonames[0];
        })
    } catch (e) {
        console.log("error", e);
    }
};

const weatherbit = async(city, days_to_travelday) => {
    const weather_bit_api_key = process.env.weather_bit_api
    const baseurl = `http://api.weatherbit.io/v2.0/forecast/daily/?days=${days_to_travelday}&city=${city}&key=${weather_bit_api_key}`;
    try {
        await getdata(baseurl).then((data) => {
            all_data['weather_bit_data'] = data.data[days_to_travelday - 1];
        })
    } catch (e) {
        console.log("error", e);
    }
};

const pixabay = async(city) => {
    const pixabay_api_key = process.env.pixabay_api
    const baseurl = `https://pixabay.com/api/?key=${pixabay_api_key}&q=${city}&image_type="photo"`;
    try {
        await getdata(baseurl).then((data) => {
            all_data['pixabay_image'] = data.hits[0].webformatURL;
        })
    } catch (e) {
        console.log("error", e);
    }
};


app.get('/all', callbackget);
// Callback function to complete GET '/all'
function callbackget(req, res) {
    res.send(all_data)
    res.end()
};

app.post('/add', cb_post);

function cb_post(req, res) {
    client_data = req.body;
    let city = client_data.city;
    let days_to_travel = client_data.days_to_travelday;
    geoname(city)
    weatherbit(city, days_to_travel)
    pixabay(city).then(() => {
        console.log(all_data)
    })
    res.send({})
    res.end();

};