import {
  Alert,
  AlertTitle,
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
  useMediaQuery,
} from '@mui/material'
import AirIcon from '@mui/icons-material/Air'
import React from 'react'
import moment from 'moment'

import RainDropsIcon from './RainDropsIcon'
import parseWeatherIcon from '../helpers/parseWeatherIcon'
import WeatherIcon from './WeatherIcon'
import useWeatherData from '../hooks/useWeatherData'

const StyledSpan = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}))

const HourlyPage = () => {
  const { data, loading, error } = useWeatherData()

  if (loading) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    )
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
      <List>
        {data.forecast.forecastday.map(day => (
          <Day key={day.date} {...day} />
        ))}
      </List>
    </Card>
  )
}

const Day = ({ date, hour }) => {
  return (
    <li>
      <CardContent>
        <Typography component='h2' variant='h6' color='GrayText'>
          {moment(date).format('dddd, MMMM DD')}
        </Typography>
      </CardContent>

      <List sx={{ width: '100%' }}>
        {hour.map(hour => (
          <Hour key={hour.time} {...hour} date={date} />
        ))}
      </List>
    </li>
  )
}

const Hour = ({
  date,
  time,
  temp_c,
  is_day,
  condition,
  chance_of_rain,
  wind_dir,
  wind_kph,
}) => {
  const matches = useMediaQuery('(min-width:768px)')

  return (
    <ListItem divider sx={{ gap: '8px' }}>
      <ListItemText
        primary={time.replace(date, '').trim()}
        sx={{ flex: '0 0 60px' }}
      />
      <ListItemText
        primary={
          <Typography variant='h6' component='span'>
            {temp_c + '°'}
          </Typography>
        }
        sx={{ flex: '0 0 60px' }}
      />
      <Box display='flex' gap='8px' flex='1 1 auto' mr='auto'>
        <ListItemIcon sx={{ minWidth: 'fit-content' }}>
          <WeatherIcon
            isDay={is_day}
            iconNumber={parseWeatherIcon(condition.icon)}
            size={32}
            block={false}
          />
        </ListItemIcon>
        <ListItemText
          primary={condition.text}
          sx={!matches ? { display: 'none' } : null}
        />
      </Box>
      <Box display='flex' alignItems='center' flex='0 0 80px' gap='8px'>
        <RainDropsIcon color='primary' sx={{ fontSize: '1.9rem' }} />
        <ListItemText primary={chance_of_rain + '%'} />
      </Box>
      <Box
        display={matches ? 'flex' : 'none'}
        flex='0 0 180px'
        alignItems='center'
        gap='8px'
      >
        <AirIcon color='primary' fontSize='small' />
        <ListItemText primary={wind_dir + ' ' + wind_kph + ' km/h'} />
      </Box>
    </ListItem>
  )
}

export default HourlyPage
