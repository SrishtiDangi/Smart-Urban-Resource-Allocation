import { useEffect, useState } from "react";
import "./WeatherWidget.css";

function WeatherWidget() {

    const [weather, setWeather] = useState(null);

    useEffect(() => {

        // Later backend API se replace karenge

        setWeather({

            city: "Delhi",

            temperature: 31,

            condition: "Light Rain",

            humidity: 72,

            rainfall: 8,

            wind: 14

        });

    }, []);

    if (!weather) {

        return <h3>Loading Weather...</h3>;

    }

    return (

        <div className="weather-card">

            <div className="weather-left">

                <h3>🌦 Live Weather</h3>

                <h1>{weather.temperature}°C</h1>

                <p>{weather.condition}</p>

                <span>{weather.city}</span>

            </div>

            <div className="weather-right">

                <div className="weather-item">

                    <h4>Humidity</h4>

                    <p>{weather.humidity}%</p>

                </div>

                <div className="weather-item">

                    <h4>Rainfall</h4>

                    <p>{weather.rainfall} mm</p>

                </div>

                <div className="weather-item">

                    <h4>Wind</h4>

                    <p>{weather.wind} km/h</p>

                </div>

            </div>

        </div>

    );

}

export default WeatherWidget;