const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const weatherImage = document.querySelector(".weather-image");

const getWeatherInformation = (address) => {
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        weatherImage.classList.add("hidden");
      } else {
        weatherImage.classList.add("hidden");
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        weatherImage.src = data.image;
        weatherImage.classList.remove("hidden");
      }
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  weatherImage.classList.add("hidden");
  e.preventDefault();

  const location = search.value;

  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";
  getWeatherInformation(location);
});
