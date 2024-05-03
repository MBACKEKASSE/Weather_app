import React, { useState } from "react";

const apiKey = "ebb31fa5d4093d7ec2996b50b67f08f4";
function Weather() {
  const [weather, setWeather] = useState({
    icon: "https://openweathermap.org/img/wn/10d@2x.png",
    temp: "20",
    city: "Dakar",
    humidity: "26",
    speed: "15",
  });

  const [city, setCity] = useState("");
  // // const cityInput = React.useRef();
  // function handleClear() {
  //   setCity("");
  // }

  function handleButton(e) {
    e.preventDefault();
    setWeather({ ...weather, city });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setWeather({ ...weather, city });
    // cityInput.current.value = "";
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        apiKey
    )
      .then((response) => {
        if (!response.ok) {
          console.error();
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeather({
          icon:
            "https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png",
          temp: data.main.temp,
          city: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
        });
      })
      .catch((error) => {
        alert("incapable d'afficher la météo");
      });
  }
  return (
    <div className="weather">
      <form onSubmit={handleSubmit}>
        <div className="search-box">
          <i className="bi bi-geo-alt-fill"></i>
          <input
            className="form-control-me-2"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Entrer une ville"
          />
          <button
            onClick={handleButton}
            type="button"
            className="btn-btn-outline-line"
          >
            Rechercher
          </button>
        </div>
        <br></br>
        <img src={weather.icon} alt="logo" style={{ width: "30%" }} />
        <br></br>
        <h1 className="display -4 fw-medium">{weather.temp}°C</h1>
        <h2 className="mb-5">{weather.city}</h2>

        <div className="row mb-3">
          <div className="col">
            <i className="bi bi-water"></i>Humidité
            <br />
            {weather.humidity}%
          </div>
          <div className="col">
            <i className="bi bi-wind"></i>Vitesse du vent
            <br />
            {weather.speed}
            KM/h
          </div>
        </div>
      </form>
    </div>
  );
}
export default Weather;
