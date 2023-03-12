import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  styled,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import moment from 'moment'

import { useAppState } from '../context'

import HourlyList from './HourlyList'
import { fetchWeatherData, setLocationUrl } from '../actions'
import { useParams } from 'react-router-dom'

const StyledSpan = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}))

const HourlyPage = () => {
  const { store, dispatch } = useAppState()
  const { data, loading, error } = store

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

  const renderHourlyWeather = () => {
    const days = data.forecast.forecastday
    return (
      <List>
        {days.map(day => (
          <Day key={day.date} day={day} />
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

const Day = ({ day }) => {
  return (
    <li>
      <CardContent>
        <Typography component='h2' variant='h6' color='GrayText'>
          {moment(day.date).format('dddd, MMMM DD')}
        </Typography>
      </CardContent>
      <HourlyList hours={day.hour} date={day.date} />
    </li>
  )
}

export default HourlyPage
