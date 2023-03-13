import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  styled,
  Typography,
} from '@mui/material'
import AirIcon from '@mui/icons-material/Air'

import WeatherIcon from './WeatherIcon'
import moment from 'moment'

import parseWeatherIcon from '../helpers/parseWeatherIcon'
import { InvertColors, LightMode, Shower } from '@mui/icons-material'

import useWeatherData from '../hooks/useWeatherData'

const NextDaysPage = () => {
  const { data, loading, error } = useWeatherData()

  const renderDaysWeather = () => {
    const days = data.forecast.forecastday.map(day => ({
      date: day.date,
      maxTempC: day.day.maxtemp_c,
      minTempC: day.day.mintemp_c,
      condition: day.day.condition.text,
      weatherIcon: parseWeatherIcon(day.day.condition.icon),
      details: [
        {
          property: 'Rain',
          icon: <Shower color='primary' fontSize='small' />,
          value: day.day.daily_chance_of_rain.toString().concat('%'),
        },
        {
          property: 'Wind',
          icon: <AirIcon color='primary' fontSize='small' />,
          value: day.day.maxwind_kph.toString().concat(' km/h'),
        },
        {
          property: 'UV',
          icon: <LightMode color='primary' fontSize='small' />,
          value: day.day.uv.toString().concat(' of 10'),
        },
        {
          property: 'Humidity',
          icon: <InvertColors color='primary' fontSize='small' />,
          value: day.day.avghumidity.toString().concat('%'),
        },
      ],
    }))

    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        {days.map(day => (
          <Card
            variant='outlined'
            sx={{
              maxWidth: '100%',
              width: '240px',
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            key={day.date}
          >
            <Typography variant='h5' component='h2' textAlign='center'>
              {moment(day.date).format('ddd D')}
            </Typography>
            <WeatherIcon
              isDay={true}
              iconNumber={day.weatherIcon}
              size={64}
              block
            />
            <Typography variant='h6' component='span'>
              {`${day.maxTempC}°`}
              <StyledSpan>{`/${day.minTempC}°`}</StyledSpan>
            </Typography>

            <Typography mb={2}>{day.condition}</Typography>
            {day.details.map(data => (
              <Box
                width='100%'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                key={data.property}
              >
                <Box component='span' display='inline-flex' alignItems='center'>
                  {data.icon}
                  <Typography>{data.property}</Typography>
                </Box>
                <Typography>{data.value}</Typography>
              </Box>
            ))}
          </Card>
        ))}
      </Box>
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
    <Card sx={{ width: 'fit-content', maxWidth: '100%' }}>
      <CardContent>
        <Typography component='h1' variant='h5' mb={3}>
          3 Day Weather
          <StyledSpan>
            {' '}
            - {data.location.name}, {data.location.region},{' '}
            {data.location.country}
          </StyledSpan>
        </Typography>
        {renderDaysWeather()}
      </CardContent>
    </Card>
  )
}

const StyledSpan = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
}))

export default NextDaysPage
