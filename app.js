const yargs = require('yargs');

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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
    
geocode.geocodeAddress(argv.address, (error, location) => {
    if(error) {
        console.log(error);
    } else {
        weather.getWeather(location.latitude, location.longitude, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`In ${location.address}.`);
                console.log(`Current temperature is ${results.currentTemp} (feels like ${results.apparentTemperature})`);
            }      
        }) ;
    }
});

