const backend_callback_url_switch = function(url) {
    return "8080" === location.port ? "http://localhost:8081" + url : url
}



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

const getdata = async(baseurl) => {
    const res = await fetch(baseurl)

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log("error", e);
    }
};
const date_diff_indays = function(date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}

export {
    backend_callback_url_switch,
    postData,
    getdata,
    date_diff_indays
}