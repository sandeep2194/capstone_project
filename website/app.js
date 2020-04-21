// Personal API Key for OpenWeatherMap API
const baseurl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=c1373afd576221e460f658492a0f69fa';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', perform_magic);
/* Function called by event listener */
function perform_magic() {
    let zipcode = document.getElementById('zip').value;
    getweather(baseurl, zipcode, apikey)
        .then(function(data) {
            postData("/add", data);
        })
        .then(function() {
            updateUI()
        })
};
/* Function to GET Web API Data*/
const getweather = async(baseurl, zipcode, apikey) => {
    const res = await fetch(baseurl + zipcode + apikey)

    try {
        const data = await res.json();
        return data;
    } catch (e) {
        console.log("error", e);
    }
};


/* Function to POST data */
const postData = async(url = " ", data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData

    } catch (e) {
        console.log("error", e);
        // appropriately handle the error
    }
};

/* Function to GET Project Data */

const updateUI = async() => {
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    const date = document.getElementById('date');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');
    const request = await fetch('/all');

    try {
        const allData = await request.json();
        date.innerHTML = `<hr> Today's Date = ${newDate}`;
        temp.innerHTML = `<br>Temprature today is ${allData.entry.temp} Ferenhite but it feels like ${allData.entry.feels_like} Ferenhite.`;
        content.innerHTML = `<br>User's Feelings : ${document.getElementById('feelings').value}`;
    } catch (e) {
        console.log('erroe', e);
    }
};