import {
  Air,
  Brightness3,
  Compress,
  InvertColors,
  Shower,
  Thermostat,
  Visibility,
  WbSunny,
} from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Typography,
} from '@mui/material'

import moment from 'moment'

import parseWeatherIcon from '../helpers/parseWeatherIcon'

import WeatherIcon from './WeatherIcon'

import useWeatherData from '../hooks/useWeatherData'

const TodayPage = () => {
  const { data, loading, error } = useWeatherData()

  const renderContent = () => {
    const {
      location: { name, country, region },
      current: {
        temp_c,
        condition,
        is_day,
        humidity,
        wind_kph,
        pressure_mb,
        uv,
        vis_km,
        feelslike_c,
      },
      forecast: { forecastday },
    } = data

    const details = [
      {
        property: 'Rain',
        icon: <Shower color='primary' fontSize='small' />,
        value: `${forecastday[0].day.daily_chance_of_rain}%`,
      },
      {
        property: 'High / Low',
        icon: <Thermostat color='primary' fontSize='small' />,
        value: `${forecastday[0].day.maxtemp_c}°/${forecastday[0].day.mintemp_c}°`,
      },
      {
        property: 'Humidity',
        icon: <InvertColors color='primary' fontSize='small' />,
        value: `${humidity}%`,
      },
      {
        property: 'Wind',
        icon: <Air color='primary' fontSize='small' />,
        value: `${wind_kph} km/h`,
      },
      {
        property: 'Pressure',
        icon: <Compress color='primary' fontSize='small' />,
        value: `${pressure_mb} mb`,
      },
      {
        property: 'UV Index',
        icon: <WbSunny color='primary' fontSize='small' />,
        value: `${uv} of 10`,
      },
      {
        property: 'Visibility',
        icon: <Visibility color='primary' fontSize='small' />,
        value: `${vis_km} km`,
      },
      {
        property: 'Moon Phase',
        icon: <Brightness3 color='primary' fontSize='small' />,
        value: `${forecastday[0].astro.moon_phase}`,
      },
    ]

    return (
      <>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CardContent>
            <Typography component='h1' variant='h5'>
              {name}, {region}, {country}{' '}
              <StyledSpan>
                As of {moment(data.current.last_updated).format('LT')}
              </StyledSpan>
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
          <CardContent>
            <WeatherIcon
              iconNumber={parseWeatherIcon(condition.icon)}
              isDay={is_day}
              size={64}
              block={false}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title={
              <Typography component='h2' variant='h6'>
                Weather Today in {name}, {region}, {country}
              </Typography>
            }
          />
          <CardContent>
            <Typography variant='h3' component='div' color='text.secondary'>
              {feelslike_c}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary'>
              Feels Like
            </Typography>
          </CardContent>
          <List
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {details.map(detail => (
              <ListItem
                divider
                key={detail.property}
                sx={{
                  display: 'flex',
                  flex: '1 1 50%',
                  minWidth: '360px',
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 'fit-content', flex: '0 1 auto', mr: 2 }}
                >
                  {detail.icon}
                </ListItemIcon>
                <ListItemText
                  primary={detail.property}
                  sx={{ flex: '0 1 auto', mr: 'auto' }}
                />
                <ListItemText
                  primary={detail.value}
                  sx={{ flex: '0 1 auto' }}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </>
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
    return <p>{JSON.stringify(error)}</p>
  }

  return (
    <Stack maxWidth='768px' rowGap={2}>
      {data && renderContent()}
    </Stack>
  )
}

const StyledSpan = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
}))

export default TodayPage
