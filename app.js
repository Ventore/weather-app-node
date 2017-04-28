const yargs = require('yargs');
const axios = require("axios");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'An address to fetch weather for',
            string: true 
        }
    })
    .help()
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

axios.get(geocodeURL).then((res) => {
    if (res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find this address');
    }
    
    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/8c5e45f2353686120c421eda1f4301da/${lat},${lng}`;
    console.log(res.data.results[0].formatted_address);
    
    return axios.get(weatherURL);
    
}).then((res) => {
    var temperature = res.data.currently.temperature;
    var apparentTemperature = res.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature} and it feels like ${apparentTemperature}`);
}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server');
    } else {
        console.log(err.message);
    }
});