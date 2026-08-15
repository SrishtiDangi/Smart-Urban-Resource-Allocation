import { useEffect, useState } from "react";
import { getWeather } from "../services/api";
import "./WeatherWidget.css";

function WeatherWidget() {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const fetchWeather = async () => {

            try {

                const response = await getWeather();

                setWeather(response.data);

                setError(false);

            } catch (err) {

                console.error("Weather API Error:", err);

                setError(true);

            } finally {

                setLoading(false);

            }

        };

        fetchWeather();

    }, []);

    if (loading) {

        return (

            <div className="weather-card">

                <h3>🌦 Loading Weather...</h3>

            </div>

        );

    }

    if (error || !weather) {

        return (

            <div className="weather-card">

                <div className="weather-left">

                    <h3>🌦 Live Weather</h3>

                    <h2>Unable to load weather</h2>

                    <p>Please make sure backend is running.</p>

                </div>

            </div>

        );

    }

    return (

        <div className="weather-card">

            <div className="weather-left">

                <h3>🌦 Live Weather</h3>

                <h1>{weather.temperature}°C</h1>

                <p>{weather.description}</p>

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

                    <h4>Source</h4>

                    <p>

                        {weather.source === "live"

                            ? "Live"

                            : "Demo"}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default WeatherWidget;