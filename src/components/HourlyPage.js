import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import WeatherIcon from './WeatherIcon'

const url = process.env.REACT_APP_WEATHERAPI_URL
const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY
const location = 'Chubut'

const StyledSpan = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}))

const HourlyPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(
      `${url}/forecast.json?key=${apiKey}&q=${location}&aqi=no&days=3&alerts=no`
    )
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

  const renderHourlyWeather = () => {
    const days = data.forecast.forecastday
    return (
      <>
        {days.map(day => (
          <div>
            <CardContent>
              <Typography component='h2' variant='h6' color='GrayText'>
                {moment(day.date).format('dddd, MMMM DD')}
              </Typography>
            </CardContent>
            <List sx={{ width: '100%' }}>
              {day.hour.map(hour => (
                <ListItem button divider sx={{ gap: '8px' }}>
                  <ListItemText
                    primary={hour.time.replace(day.date, '').trim()}
                    sx={{ flex: 1 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant='h6' component='span'>
                        {hour.temp_c + '°'}
                      </Typography>
                    }
                    sx={{ flex: 1 }}
                  />
                  <Box sx={{ display: 'flex', gap: '8px', flex: 4 }}>
                    <ListItemIcon sx={{ minWidth: 'fit-content' }}>
                      <WeatherIcon
                        isDay={hour.is_day}
                        iconNumber={parseWeatherIcon(hour.condition.icon)}
                        size={32}
                      />
                    </ListItemIcon>
                    <ListItemText primary={hour.condition.text} />
                  </Box>
                  <ListItemText
                    primary={hour.chance_of_rain + '%'}
                    sx={{ flex: 1 }}
                  />
                  <ListItemText
                    primary={hour.wind_dir + ' ' + hour.wind_kph + ' km/h'}
                    sx={{ flex: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        ))}
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
        flexDirection: 'column',
        maxWidth: '768px',
      }}
    >
      <CardContent>
        <Typography component='h1' variant='h5'>
          Hourly Weather
          <StyledSpan>
            {' '}
            - {data.location.name}, {data.location.region},{' '}
            {data.location.country}
          </StyledSpan>
        </Typography>
      </CardContent>

      {renderHourlyWeather()}
    </Card>
  )
}

export default HourlyPage
