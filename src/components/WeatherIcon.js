import PropTypes from 'prop-types'
import { styled } from '@mui/material'

import daySprite from '../icons/weather-icons/daySprite.svg'
import nightSprite from '../icons/weather-icons/nightSprite.svg'

const StyledSvg = styled('svg')(({ theme, size, block }) => ({
  fill: theme.palette.primary.main,
  width: `${size}px`,
  height: `${size}px`,
  display: `${block ? 'block' : 'inline'}`,
}))

const WeatherIcon = ({ iconNumber, isDay, size, block }) => {
  return (
    <StyledSvg className='icon' size={size} block={+block}>
      <use xlinkHref={`${isDay ? daySprite : nightSprite}#${iconNumber}`}></use>
    </StyledSvg>
  )
}

WeatherIcon.propTypes = {
  block: PropTypes.bool,
}

export default WeatherIcon
