import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import AirIcon from '@mui/icons-material/Air'

import WeatherIcon from './WeatherIcon'
import RainDropsIcon from './RainDropsIcon'
import parseWeatherIcon from '../helpers/parseWeatherIcon'
import React from 'react'

export const HourlyList = ({ hours, date }) => {
  return (
    <List sx={{ width: '100%' }}>
      {hours.map(hour => (
        <HourlyItem
          timeHour={hour.time.replace(date, '').trim()}
          tempC={hour.temp_c}
          isDay={hour.is_day}
          conditionIcon={hour.condition.icon}
          conditionText={hour.condition.text}
          chanceRain={hour.chance_of_rain}
          windDir={hour.wind_dir}
          windKph={hour.wind_kph}
          key={hour.time}
        />
      ))}
    </List>
  )
}

const HourlyItem = ({
  timeHour,
  tempC,
  isDay,
  conditionIcon,
  conditionText,
  chanceRain,
  windDir,
  windKph,
}) => {
  return (
    <ListItem button divider sx={{ gap: '8px' }}>
      <ListItemText primary={timeHour} sx={{ flex: 1 }} />
      <ListItemText
        primary={
          <Typography variant='h6' component='span'>
            {tempC + '°'}
          </Typography>
        }
        sx={{ flex: 1 }}
      />
      <Box sx={{ display: 'flex', gap: '8px', flex: 4 }}>
        <ListItemIcon sx={{ minWidth: 'fit-content' }}>
          <WeatherIcon
            isDay={isDay}
            iconNumber={parseWeatherIcon(conditionIcon)}
            size={32}
          />
        </ListItemIcon>
        <ListItemText primary={conditionText} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: '8px' }}>
        <RainDropsIcon color='primary' sx={{ fontSize: '1.9rem' }} />
        <ListItemText primary={chanceRain + '%'} />
      </Box>
      <Box sx={{ display: 'flex', flex: 2, alignItems: 'center', gap: '8px' }}>
        <AirIcon color='primary' fontSize='small' />
        <ListItemText primary={windDir + ' ' + windKph + ' km/h'} />
      </Box>
    </ListItem>
  )
}

export default HourlyList
