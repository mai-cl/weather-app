import { styled, Box } from '@mui/material'

import daySprite from '../icons/weather-icons/daySprite.svg'
import nightSprite from '../icons/weather-icons/nightSprite.svg'

const StyledSvg = styled('svg')(({ theme, size }) => ({
  fill: theme.palette.primary.main,
  width: `${size}px`,
  height: `${size}px`,
}))

const WeatherIcon = ({ iconNumber, isDay, size }) => {
  return (
    <StyledSvg className='icon' size={size}>
      <use xlinkHref={`${isDay ? daySprite : nightSprite}#${iconNumber}`}></use>
    </StyledSvg>
  )
}

export default WeatherIcon
