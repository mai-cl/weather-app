const url = process.env.REACT_APP_WEATHERAPI_URL
const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY

const startWeatherLoading = () => ({
  type: 'WEATHER_LOADING',
})

const setWeatherError = error => ({
  type: 'WEATHER_ERROR',
  payload: error,
})

const setWeatherData = data => ({
  type: 'WEATHER_SET_DATA',
  payload: data,
})

export const setLocationUrl = locationUrl => ({
  type: 'WEATHER_SET_LOCATION_URL',
  payload: locationUrl,
})

export const fetchWeatherData = location => dispatch => {
  dispatch(startWeatherLoading())
  fetch(
    `${url}/forecast.json?key=${apiKey}&q=${location}&aqi=yes&days=3&alerts=no`
  )
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)
      dispatch(setWeatherData(data))
    })
    .catch(error => {
      dispatch(
        setWeatherError({
          message: error.message,
        })
      )
    })
}
