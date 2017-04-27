const request = require("request");

var  geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
        json: true
    }, (err, res, body) => {
    
    if (err) {
        callback("Unable to connect to Google service");
    } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find this address');
    } else if(body.status === 'OK') {
        var location = body.results[0].geometry.location;
        callback(undefined, {
            address: body.results[0].formatted_address,
            latitude: location.lat,
            longitude: location.lng
        });
    }
});
};

module.exports = {
    geocodeAddress
};

//8c5e45f2353686120c421eda1f4301da