import { FormProvider, useForm } from "react-hook-form";
import { ErrorMessage, LatitudeInput, LongitudeInput } from "./TextInput";
import { TIME_OF_DAY, WEATHER_API_URL } from "../../constants";
import WeatherFormSubmitButton from "./WeatherFormSubmitButton";
import WeatherDateInput from "./WeatherDateInput";
import TimeOfDaySelect from "./TimeOfDaySelect";
import { styled } from "@mui/material/styles";
import { getDifferenceInDaysFromToday } from "../../utils";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export const FormInputContainer = styled('div')(() => ({
  marginBottom: '20px',
}));

const FormContainer = styled('div')(() => ({
  width: '300px',
  margin: '0 auto',
}));

const InputTitle = styled('div')(() => ({
  fontSize: '1rem',
  fontWeight: 700,
  marginBottom: '8px',
}));

function WeatherForm({ onRecieveWeatherData }) {
    const formMethods = useForm({ mode: 'all'});
    const { handleSubmit } = formMethods;
    const [formSubmitError, setFormSubmitError] = useState(null);
    const { fetchData, loading, error } = useFetch();

    const fetchOptions = {
        method: 'GET',
        headers: {
          'User-Agent': 'parweatherapp.com/petey.richter@gmail.com',
        }
    };

    const errorMessage = error || formSubmitError;

    const onSubmitWeatherData = async (data) => {
        const { latitude, longitude, selectedDate, timeOfDay } = data;
        setFormSubmitError(null);

        try {
          // First API call to get the forecast URL
          const pointsData = await fetchData({
            url: `${WEATHER_API_URL}/points/${latitude},${longitude}`,
            options:fetchOptions,
            customErrorMessage: 'Please make sure you entered coordinates within the US',
          });

          if (!pointsData?.properties?.forecast) {
            throw new Error('Please make sure you entered coordinates within the US');
          }

          // Second API call to get the actual forecast data
          const forecastData = await fetchData({url: pointsData.properties.forecast, options: fetchOptions});

          if (forecastData) {
            const formattedData = formatWeatherData(forecastData, selectedDate, timeOfDay);
            onRecieveWeatherData(formattedData);
          }
        } catch (error) {
          setFormSubmitError(`Error fetching weather data: ${error.message}`);
        }
      }
    
  return (
    <FormProvider {...formMethods} >
        <FormContainer>
          { errorMessage && <ErrorMessage large>{errorMessage}</ErrorMessage> }
          <form onSubmit={handleSubmit(onSubmitWeatherData)}>
              <InputTitle>Enter the latitude and longitude</InputTitle>
              <LatitudeInput />
              <LongitudeInput />
              <InputTitle>Select date (within the next 5 days)</InputTitle>
              <WeatherDateInput />
              <TimeOfDaySelect />
              <WeatherFormSubmitButton loading={loading} />
          </form>
        </FormContainer>
    </FormProvider>
  );
}

function formatWeatherData(data, selectedDate, timeOfDay = TIME_OF_DAY.DAY) {
  const periods = data?.properties?.periods;
  if (!periods || !Array.isArray(periods)) return null;

  const isDaytime = timeOfDay === TIME_OF_DAY.DAY;

  const daysDifference = getDifferenceInDaysFromToday(selectedDate);
  if (daysDifference < 0 || daysDifference > 5) return null;

  const period = periods.filter(p => p.isDaytime === isDaytime).find((_p, i) => i === daysDifference);

  if (!period) return null;

  const { detailedForecast, temperature, probabilityOfPrecipitation } = period;

  return {
    details: detailedForecast,
    temperature,
    chanceOfRain: probabilityOfPrecipitation.value,
  };
}

export default WeatherForm;


/*



          const [formSubmitError, setFormSubmitError] = useState(null);

    const onSubmitWeatherData = (data) => {
        const { latitude, longitude, selectedDate, timeOfDay } = data;
        setFormSubmitError(null);

        fetch(`${WEATHER_API_URL}/points/${latitude},${longitude}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'parweatherapp.com/petey.richter@gmail.com',
          }
        })
          .then(response => {
            if (response.ok) return response.json();
            throw new Error('Please make sure you entered coordiantes within the US');
          })
          .then(data => {
            if (data?.properties?.forecast) {
              fetch(data.properties.forecast, {
                method: 'GET',
                headers: {
                  'User-Agent': 'parweatherapp.com/petey.richter@gmail.com',
                }
              })
                .then(response => {
                  if (response?.ok) return response.json();
                  throw new Error('Error fetching forecast data');
                })
                .then(data => {
                  if (data) {
                    const formattedData = formatWeatherData(data, selectedDate, timeOfDay);
                    onRecieveWeatherData(formattedData);
                  }
                })
            }
          })
          .catch(error => {
            setFormSubmitError(`Error fetching weather data: ${error.message}`);
          });
      }
          */