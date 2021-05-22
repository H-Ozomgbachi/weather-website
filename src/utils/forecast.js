const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bf0bfc0e7f0afe9d0b48e7dfbde7134a&query=${lat},${lng}`;

  request({ url, json: true }, (error, response = {}) => {
    const { body } = response;

    if (error) {
      callback("Unable to connect to weather api", undefined);
    } else if (body?.error) {
      callback(`${body?.error.info}`, undefined);
    } else {
      callback(undefined, {
        message: `${body?.current.weather_descriptions[0]}. It is currently ${body?.current.temperature} degrees out. It feels like ${body?.current.feelslike} degrees out.`,
        image: body?.current.weather_icons[0],
      });
    }
  });
};

module.exports = forecast;
