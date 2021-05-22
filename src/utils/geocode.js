const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoid2Vlbm8iLCJhIjoiY2ttcTJ4MmcyMW04ZjJ4cnp2OGFzaTJ2YSJ9.5EEG25lax_mg1O9EyiQgxQ&limit=1`;

  request({ url, json: true }, (error, response = {}) => {
    const { body } = response;

    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body?.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body?.features[0].center[1],
        longitude: body?.features[0].center[0],
        location: body?.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
