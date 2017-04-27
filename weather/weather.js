const request = require("request");

var getWeather = (lat, lng, callback) => {
        request({
            url: `https://api.darksky.net/forecast/8c5e45f2353686120c421eda1f4301da/${lat},${lng}`,
            json: true
        }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            callback(undefined, {
                currentTemp: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather!');
        }
    });    
};

module.exports.getWeather = getWeather;