import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${process.env.BASE_URL}current.json?key=${process.env.API_KEY}&q=${query}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(weather);
        });
    }
  }

  const dateBuilder = (d) => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className="App">
      <main>
        <h1>Weather App</h1>
        <p> This is a weather app built with React.js</p>
        <div className='search-box'>
          <input className='search-bar' type='text' placeholder='Search for a city' onChange={e => setQuery(e.target.value)} onKeyPress={search} />
          <button className="btn-search">Search</button>
        </div>
        {(typeof weather.current !== "undefined") ? (
          <div className='collapse-block'>
            <div className='location-box'>
              <div className="location">{weather.location.name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{weather.current.temp_c}</div>
              <div className='weather'>{weather.current.condition.text}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
