const button = document.querySelector("button");
const header = document.getElementById("weatherInfo");
const city = document.getElementById("cityName").value;
button.addEventListener("click", () => weather(city))

async function weather(city) {
    const url = `/api?q=${city}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 404) {
        alert('City not found');
        return;
    }

    const tempC = (data.main.temp - 273.15).toFixed(1);

    header.innerText = `Weather in ${data.name} is ${tempC} °C`;
}