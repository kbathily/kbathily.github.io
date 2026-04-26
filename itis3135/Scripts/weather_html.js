// Get elements
const button = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");

// Async function to fetch weather
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error); // REQUIRED
    return undefined;
  }
}

// Function to display weather
async function showWeather(city) {
  const data = await getWeather(city);

  // Handle error case
  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  // Extract data safely
  const weather = data.weather && data.weather[0] ? data.weather[0] : {};
  const main = data.main || {};
  const wind = data.wind || {};

  // Update UI (use N/A if undefined)
  document.getElementById("weather-icon").src =
    weather.icon || "images/myphotos/Kudu%20Brave%20icon.png";

  document.getElementById("main-temperature").innerText =
    main.temp !== undefined ? `Temperature: ${main.temp} °C` : "Temperature: N/A";

  document.getElementById("feels-like").innerText =
    main.feels_like !== undefined ? `Feels like: ${main.feels_like} °C` : "Feels like: N/A";

  document.getElementById("humidity").innerText =
    main.humidity !== undefined ? `Humidity: ${main.humidity}%` : "Humidity: N/A";

  document.getElementById("wind").innerText =
    wind.speed !== undefined ? `Wind: ${wind.speed} m/s` : "Wind: N/A";

  document.getElementById("wind-gust").innerText =
    wind.gust !== undefined ? `Wind gust: ${wind.gust} m/s` : "Wind gust: N/A";

  document.getElementById("weather-main").innerText =
    weather.main ? `Condition: ${weather.main}` : "Condition: N/A";

  document.getElementById("location").innerText =
    data.name ? `Location: ${data.name}` : "Location: N/A";
}

// Button click
button.addEventListener("click", () => {
  const city = select.value;

  if (!city) return; // do nothing if empty

  showWeather(city);
});