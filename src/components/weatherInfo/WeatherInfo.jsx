import styled from "@emotion/styled";
import DetailedForcast from "./DetailedForcast";
import WeatherGraphs from "./WeatherGraphs";

const InfoContainer = styled('div')(() => ({
  width: '90%',
  margin: '0 auto',
}));

function WeatherInfoTitle({ children }) {
    return (
        <h3>{children}</h3>
    );
}

function WeatherInfo({ weatherData }) {
    if (!weatherData) return null;

    return (
      <InfoContainer>
        <WeatherInfoTitle>Weather Info</WeatherInfoTitle>
        <DetailedForcast detailedForcast={weatherData.details} />
        <WeatherGraphs
          temperature={weatherData.temperature}
          probabilityOfPrecipitation={weatherData.chanceOfRain}
        />
      </InfoContainer>
    );
}

export default WeatherInfo;