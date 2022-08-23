import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { fetchWeatherData } from '../actions'
import { useAppState } from '../context'
import parseWeatherIcon from '../helpers/parseWeatherIcon'

import WeatherIcon from './WeatherIcon'

const TodayPage = () => {
  const { store, dispatch } = useAppState()
  const { data, loading, error, location } = store

  useEffect(() => {
    dispatch(fetchWeatherData(location))
  }, [location])

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
    <>
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
    </>
  )
}

export default TodayPage
