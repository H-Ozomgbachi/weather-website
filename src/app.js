const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Henry Ozomgbachi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Henry Ozomgbachi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Henry Ozomgbachi",
    helpText: "This is some helpful text",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(data.latitude, data.longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error: err,
        });
      }

      res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Henry Ozomgbachi",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Henry Ozomgbachi",
    message: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});