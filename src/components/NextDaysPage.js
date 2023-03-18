import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  CircularProgress,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import AirIcon from '@mui/icons-material/Air'

import WeatherIcon from './WeatherIcon'
import moment from 'moment'

import parseWeatherIcon from '../helpers/parseWeatherIcon'
import { InvertColors, LightMode, Shower } from '@mui/icons-material'

import useWeatherData from '../hooks/useWeatherData'

const NextDaysPage = () => {
  const { data, loading, error } = useWeatherData()
  const theme = useTheme()

  const matches768pSize = useMediaQuery('(max-width:768px)')
  const matchesSmSize = useMediaQuery(theme.breakpoints.down('sm'))

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
      <Box display='flex' gap={2} flexWrap='wrap' width='100%'>
        {days.map(day => (
          <Card
            variant='outlined'
            sx={{
              padding: '40px 20px',
              maxWidth: '270px',
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              alignItems: 'center',
              ...(matches768pSize && {
                maxWidth: 'auto',
                flex: '1 1 100%',
                flexDirection: 'row',
                gap: 3,
              }),
              ...(matchesSmSize && {
                width: '100%',
                flex: '1 1 auto',
                flexDirection: 'column',
                gap: 0,
              }),
            }}
            key={day.date}
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              rowGap={1}
              mb={matches768pSize ? 0 : 1}
              flex={matches768pSize ? '1' : 'initial'}
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

              <Typography mb={2} textAlign='center'>
                {day.condition}
              </Typography>
            </Box>
            <Box width='100%' flex={matches768pSize ? '3' : 'initial'}>
              {day.details.map(data => (
                <Box
                  width='100%'
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mb={1}
                  key={data.property}
                >
                  <Box
                    component='span'
                    display='inline-flex'
                    alignItems='center'
                  >
                    {data.icon}
                    <Typography ml={1}>{data.property}</Typography>
                  </Box>
                  <Typography>{data.value}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        ))}
      </Box>
    )
  }

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
    <Card sx={{ width: '100%' }}>
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
