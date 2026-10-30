
let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");

let cityname = document.getElementById("cityname");
let tempreature = document.getElementById("tempreature");
let condition = document.getElementById("condition");
let windspeed = document.getElementById("windspeed");

async function getWeather() {

    let cityValue = cityInput.value.trim();

    if (cityValue === "") {
        alert("Please enter a city name!");
        return;
    }

    try {

        // Step 1: Get city coordinates

        let geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityValue)}&count=1&language=en&format=json`;

        let response = await fetch(geoURL);

        if (!response.ok) {
            throw new Error("Unable to find city!");
        }

        let data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert("City not found!");
            return;
        }

        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;

        let city = data.results[0].name;

        // Step 2: Get weather details

        let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m`;

        let weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Unable to get weather!");
        }

        let weatherData = await weatherResponse.json();

        console.log(weatherData);

        let current = weatherData.current;

        // Step 3: Weather conditions

        let weatherCondition = {
            0: "Clear Sky ☀️",
            1: "Mainly Clear 🌤️",
            2: "Partly Cloudy ⛅",
            3: "Overcast ☁️",
            45: "Foggy 🌫️",
            48: "Rime Fog 🌫️",
            51: "Light Drizzle 🌦️",
            53: "Moderate Drizzle 🌦️",
            55: "Heavy Drizzle 🌧️",
            61: "Light Rain 🌧️",
            63: "Moderate Rain 🌧️",
            65: "Heavy Rain ⛈️",
            71: "Light Snow ❄️",
            73: "Moderate Snow ❄️",
            75: "Heavy Snow ❄️",
            80: "Rain Showers 🌧️",
            81: "Heavy Rain Showers 🌧️",
            82: "Violent Rain Showers ⛈️",
            95: "Thunderstorm ⛈️",
            96: "Thunderstorm with Hail ⛈️",
            99: "Heavy Thunderstorm ⛈️"
        };

        // Step 4: Display weather

        cityname.innerText = "📍 " + city;

        tempreature.innerText =
            "🌡️ Temperature: " + current.temperature_2m + " °C";

        condition.innerText =
            "🌥️ Condition: " +
            (weatherCondition[current.weather_code] || "Unknown");

        windspeed.innerText =
            "💨 Wind Speed: " + current.wind_speed_10m + " km/h";

    }

    catch (error) {

        console.log("Error:", error);

        alert("Something went wrong! Please try again.");

    }

}

searchBtn.addEventListener("click", getWeather);
