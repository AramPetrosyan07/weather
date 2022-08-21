import React, { useEffect, useState } from 'react';
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";


function App() {
    const [place, setPlace] = useState('Odzun')
    const [resultat, setResultat] = useState({})

    useEffect(() => {
        getData()
    }, [place])

    const getData = () => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=e43fe9a8f5db46eea9171912222108&q=${place}&days=1&aqi=no&alerts=no`)
            .then(res => res.json())
            .then(res => setResultat({
                name: res.location.name,
                country: res.location.country,
                celsius: {
                    current: res.current.temp_c,
                    high: res.forecast.forecastday[0].day.maxtemp_c,
                    low: res.forecast.forecastday[0].day.mintemp_c,
                },
                condition: res.current.condition.text,
            }))
    }




    return (
        <div className='app' style={
            resultat.condition?.toLowerCase() === "clear" ||
                resultat.condition?.toLowerCase() === "sunny"
                ? { backgroundImage: `url(${Clear})` }
                : resultat.condition?.includes("cloudy")
                    ? { backgroundImage: `url(${Cloudy})` }
                    : resultat.condition?.toLowerCase().includes("rainy")
                        ? { backgroundImage: `url(${Rainy})` }
                        : resultat.condition?.toLowerCase().includes("snow")
                            ? { backgroundImage: `url(${Snow})` }
                            : { backgroundImage: `url(${Overcast})` }
        }>
            <div className="search-input">
                <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
            </div>
            {resultat.name === '' || resultat.name === undefined ? <h1>Not found</h1> :
                (<div className="weather-container">
                    <div className="top-part">
                        <h1>{resultat.celsius.current} °C</h1>
                        <div className="condition-high-low">
                            <h1>{resultat.condition}</h1>
                            <h1>↑ {resultat.celsius.high} °C</h1>
                            <h1>↓ {resultat.celsius.low} °C</h1>
                        </div>
                    </div>
                    <h1 className='contry'>{resultat.name}, {resultat.country}</h1>
                </div>)}
        </div>
    );
}


export default App;

