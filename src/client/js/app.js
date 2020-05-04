import { backend_callback_url_switch } from "./helpers";
import { postData } from "./helpers";
import { date_diff_indays } from "./helpers";
//declaring data objects
let all_data = {}
let c_data = {}

//running one fuction after the other
function magic() {
    const city = document.getElementById('city').value
    geoname(city).then(() => {
        weatherbit(city).then(() => {
            pixabay(city).then(() => {
                consolidate(all_data, c_data, city).then(() => {
                    postData(backend_callback_url_switch('/add'), all_data).then(() => {
                        c_data = {}
                        all_data = {}
                        updateUI()
                    })
                })
            })

        })

    })
};
//add data to one object
const consolidate = async(data1, data2, city) => {
    data1[city] = data2;
}

//update UI 
const updateUI = async() => {
    const request = await fetch(backend_callback_url_switch('/all'));
    const start_date = document.getElementById('travelday');
    const end_date = document.getElementById('endday');
    const legth_of_trip = date_diff_indays(start_date.value, end_date.value);
    try {
        const data = await request.json();
        const trips_section = document.getElementById('trips')
            //for each key of fecthed data we create a row
        for (let acity of Object.keys(data)) {

            let trip = `<div class='trip_card' id='card'>
                        <div id="city_img">
                        <img src="${data[acity].pixabay_image}" alt="${acity}">
                        </div>
                        <div id='meta'>
                        <div id='basic_info'>
                        <strong>Length of trip : ${legth_of_trip} days</strong>
                            <div id='city'><span>City: </span>${acity}</div>
                            <div id='Country'><span>Country: </span>${data[acity].geoname.countryName}</div>
                            <div id='long'><span>Longitude: </span>${data[acity].geoname.lng}</div>
                            <div id='lat'><span>Latitude: </span>${data[acity].geoname.lat}</div>
                        </div>
                        <div id='weather_info'>
                        <h2>Weather</h2>
                            <div id='day1'>
                                <div id='description'><span>Description: </span>${data[acity].weather_bit_data.weather.description}</div>
                                <div id='temp'><span>Temprature: </span>${data[acity].weather_bit_data.temp} 'C</div>
                            </div>
                        </div>
                        </div>
                    </div>`
            trips_section.insertAdjacentHTML('beforeend', trip);
        }
        document.getElementById('error').innerHTML = '';
    } catch (e) {
        document.getElementById('error').innerHTML = 'Sorry some error occured'
    }
};
//fuction to fectch apis
const getdata = async(baseurl) => {
    const res = await fetch(baseurl)
    try {
        const data = await res.json();
        return data;
    } catch (e) {
        console.log("error", e);
    }
};
//geoname fuction to fecth long & lat
const geoname = async(query) => {
    const baseurl = `http://api.geonames.org/searchJSON?q=${query}&maxRows=1&username=sandeep2194`;
    try {
        await getdata(baseurl).then((data) => {
            c_data['geoname'] = data.geonames[0]
        })
    } catch (e) {
        console.log('error', e)
    }
};
//to fecth weather data
const weatherbit = async(city) => {
    const weather_bit_api_key = "c71b0c35541642f496f87d3b9841d49f"
    const baseurl = `http://api.weatherbit.io/v2.0/forecast/daily/?days=1&city=${city}&key=${weather_bit_api_key}`;
    try {
        await getdata(baseurl).then((data) => {
            c_data['weather_bit_data'] = data.data[0]

        })
    } catch (e) {
        console.log('error', e)
    }
};
//to get images from image api
const pixabay = async(city) => {
    const pixabay_api_key = "10508829-a311f765d5edbcbe236b9574b"
    const baseurl = `https://pixabay.com/api/?key=${pixabay_api_key}&q=${city}`;
    try {
        await getdata(baseurl).then((data) => {
            c_data['pixabay_image'] = data.hits[0].webformatURL
        })
    } catch (e) {
        console.log('error', e)

    }
};


export { magic };