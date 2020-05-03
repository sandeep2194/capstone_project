import { backend_callback_url_switch } from "./helpers";
import { postData } from "./helpers";
import { date_diff_indays } from "./helpers";


function magic() {
    const today = new Date();
    const travelday = document.getElementById('travelday').value;
    const days_to_travelday = date_diff_indays(today, travelday);
    let client_data = {
        city: document.getElementById('city').value,
        days_to_travelday: days_to_travelday,
    }
    console.log(client_data)
    postData(backend_callback_url_switch('/add'), client_data);
    console.log('Sent')
    setTimeout(() => {
        updateUI()
    }, 2500);


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
        const geoname_data = await request.json();
        console.log(geoname_data);
    } catch (e) {
        console.log('erroe', e);
    }
};

export { magic, updateUI };