import { useState } from 'react'
import WeatherForm from './components/forms/WeatherForm';
import WeatherInfo from './components/weatherInfo/WeatherInfo';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  }

  return (
    <>
      <h1>Weather App</h1>
      <WeatherForm onRecieveWeatherData={handleWeatherData} />
      <WeatherInfo weatherData={weatherData} />
    </>
  )
}

export default App