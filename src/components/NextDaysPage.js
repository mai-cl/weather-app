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
import AirIcon from '@mui/icons-material/Air'
import { useEffect } from 'react'
import WeatherIcon from './WeatherIcon'
import moment from 'moment'
import { useAppState } from '../context'
import { fetchWeatherData } from '../actions'
import RainDropsIcon from './RainDropsIcon'
import parseWeatherIcon from '../helpers/parseWeatherIcon'

const NextDaysPage = () => {
  const { store, dispatch } = useAppState()
  const { data, loading, error, location } = store

  useEffect(() => {
    dispatch(fetchWeatherData(location))
  }, [location])

  const renderDaysWeather = () => {
    const days = data.forecast.forecastday

    return (
      <List sx={{ width: '100%' }}>
        {days.map(day => (
          <ListItem button divider sx={{ gap: '8px' }} key={day.date}>
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
              sx={{ flex: 1.5 }}
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
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <RainDropsIcon color='primary' sx={{ fontSize: '1.9rem' }} />
              <ListItemText primary={day.day.daily_chance_of_rain + '%'} />
            </Box>
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AirIcon color='primary' fontSize='small' />
              <ListItemText primary={day.day.maxwind_kph + ' km/h'} />
            </Box>
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
