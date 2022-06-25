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
import { useEffect, useState } from 'react'
import WeatherIcon from './WeatherIcon'
import moment from 'moment'

const url = process.env.REACT_APP_WEATHERAPI_URL
const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY
const location = 'Chubut'

const NextDaysPage = () => {
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

  const renderDaysWeather = () => {
    const days = data.forecast.forecastday

    return (
      <List sx={{ width: '100%' }}>
        {days.map(day => (
          <ListItem button divider sx={{ gap: '8px' }}>
            <ListItemText
              primary={moment(day.date).format('ddd D')}
              sx={{ flex: 1 }}
            />
            <ListItemText
              primary={
                <Typography variant='h6' component='span'>
                  {`${day.day.maxtemp_c}°`}
                  <StyledSpan>{`/${day.day.mintemp_c}°`}</StyledSpan>
                </Typography>
              }
              sx={{ flex: 1 }}
            />
            <Box sx={{ display: 'flex', gap: '8px', flex: 4 }}>
              <ListItemIcon sx={{ minWidth: 'fit-content' }}>
                <WeatherIcon
                  isDay={true}
                  iconNumber={parseWeatherIcon(day.day.condition.icon)}
                  size={32}
                />
              </ListItemIcon>
              <ListItemText primary={day.day.condition.text} />
            </Box>
            <ListItemText
              primary={day.day.daily_chance_of_rain + '%'}
              sx={{ flex: 1 }}
            />
            <ListItemText
              primary={day.day.maxwind_kph + ' km/h'}
              sx={{ flex: 1 }}
            />
          </ListItem>
        ))}
      </List>
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
          3 Day Weather
          <StyledSpan>
            {' '}
            - {data.location.name}, {data.location.region},{' '}
            {data.location.country}
          </StyledSpan>
        </Typography>
      </CardContent>

      {renderDaysWeather()}
    </Card>
  )
}

const StyledSpan = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
}))

export default NextDaysPage
