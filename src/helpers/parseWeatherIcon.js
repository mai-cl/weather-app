const parseWeatherIcon = url =>
  url
    .replace('.png', '')
    .replace('//cdn.weatherapi.com/weather/64x64/', '')
    .replace('night/', '')
    .replace('day/', '')

export default parseWeatherIcon
