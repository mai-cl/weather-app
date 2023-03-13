import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchWeatherData, setLocationUrl } from '../actions'
import { useAppState } from '../context'

const useWeatherData = () => {
  const {
    store: { data, error, loading },
    dispatch,
  } = useAppState()
  const { locationUrl } = useParams()

  useEffect(() => {
    if (locationUrl) {
      dispatch(setLocationUrl(locationUrl))
      return dispatch(fetchWeatherData(locationUrl))
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch(
          fetchWeatherData(
            `${position.coords.latitude},${position.coords.longitude}`
          )
        )
      },
      error => {
        console.log(
          'Please enable the permissions for know your location or just search a specific location'
        )
      }
    )
  }, [locationUrl, dispatch])

  return { data, error, loading }
}

export default useWeatherData
