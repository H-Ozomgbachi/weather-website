const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

const getWeatherInformation = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";
  getWeatherInformation(location);
});
