const unsplashApiUrl =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=road";

const coinGeckoApiUrl = "https://api.coingecko.com/api/v3/coins/bitcoin";

function setTime() {
  document.querySelector("h1").innerText = new Date().toLocaleTimeString(
    "en-gb",
    { timeStyle: "medium" }
  );
}

async function getImage(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    document.body.style.backgroundImage = `url('${data.urls.full}')`;
    document.getElementById("location").textContent = data.user.location;
  } catch (err) {
    console.error("Something went wrong");
    document.body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1508233620467-f79f1e317a05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)";
  }
}

async function getCryptoData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong, status: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.thumb}>
    <span>${data.name}</span>`;
    document.getElementById("crypto").innerHTML += `
    <p>📊 €${data.market_data.current_price.eur}</p>
    <p>📈 €${data.market_data.high_24h.eur}</p>
    <p>📉 €${data.market_data.low_24h.eur}</p>`;
  } catch (err) {
    console.error(err);
  }
}

navigator.geolocation.getCurrentPosition(async function getWeather(position) {
  try {
    const response = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Weather data not recovered, status: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById("weather-top").innerHTML = `
    <img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>
    <p>${Math.round(data.main.temp)}°</p>`;
    document.getElementById("weather").innerHTML += `
    <p>${data.name}</p>`;
  } catch (err) {
    console.error(err);
  }
});

getCryptoData(coinGeckoApiUrl);
getImage(unsplashApiUrl);
setTime();

setInterval(setTime, 1000);
