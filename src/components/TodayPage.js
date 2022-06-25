import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import WeatherIcon from './WeatherIcon'

const url = process.env.REACT_APP_WEATHERAPI_URL
const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY
const location = 'Chubut'

const TodayPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${url}/current.json?key=${apiKey}&q=${location}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  const parseWeatherIcon = url =>
    url
      .replace('.png', '')
      .replace('//cdn.weatherapi.com/weather/64x64/', '')
      .replace('night/', '')
      .replace('day/', '')

  const renderContent = () => {
    const {
      location: { name, country, region },
      current: { temp_c, condition, is_day },
    } = data

    return (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='h1' variant='h5'>
              {name}, {region}, {country}
            </Typography>
            <Typography variant='h1' color='text.secondary' component='div'>
              {temp_c}°C
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
            >
              {condition.text}
            </Typography>
          </CardContent>
        </Box>
        <Box padding='16px'>
          <WeatherIcon
            iconNumber={parseWeatherIcon(condition.icon)}
            isDay={is_day}
            size={64}
          />
        </Box>
      </>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }

  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: '768px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {data && renderContent()}
    </Card>
  )
}

export default TodayPage
