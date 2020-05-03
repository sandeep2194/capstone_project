import { backend_callback_url_switch } from "./helpers";
import { postData } from "./helpers";
import { date_diff_indays } from "./helpers";

let all_data = {}

function magic() {
    const city = document.getElementById('city').value
    geoname(city).then(() => {
        weatherbit(city).then(() => {
            pixabay(city).then(() => {
                postData(backend_callback_url_switch('/add'), all_data).then(() => {
                    updateUI()
                })
            })

        })

    })
};

const updateUI = async() => {
    // let d = new Date();
    // let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    const country = document.getElementById('country');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');
    const travelday = document.getElementById('travelday');
    const request = await fetch(backend_callback_url_switch('/all'));

    try {
        const data = await request.json();
    } catch (e) {
        console.log('erroe', e);
    }
};
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
            all_data[query + '_geonames'] = data.geonames[0]

        })
    } catch (e) {
        all_data[query] = {
            type: 'geoname',
            error: "yes",
            error_name: e.name,
            error_message: e.message
        }

    }
};

const weatherbit = async(city) => {
    const weather_bit_api_key = "c71b0c35541642f496f87d3b9841d49f"
    const baseurl = `http://api.weatherbit.io/v2.0/forecast/daily/?days=1&city=${city}&key=${weather_bit_api_key}`;
    try {
        await getdata(baseurl).then((data) => {
            all_data[city + '_weather_bit_data'] = data.data[0]
        })
    } catch (e) {
        all_data[city] = {
            type: 'weather_bit_data',
            error: "yes",
            error_name: e.name,
            error_message: e.message
        }

    }
};

const pixabay = async(city) => {
    const pixabay_api_key = "10508829-a311f765d5edbcbe236b9574b"
    const baseurl = `https://pixabay.com/api/?key=${pixabay_api_key}&q=${city}`;
    try {
        await getdata(baseurl).then((data) => {
            all_data[city + '_pixabay_image'] = data.hits[0].webformatURL
        })
    } catch (e) {
        all_data[city] = {
            type: 'pixabay_image',
            error: "yes",
            error_name: e.name,
            error_message: e.message
        }

    }
};


export { magic };