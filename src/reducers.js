export const weatherData = (state, action) => {
  switch (action.type) {
    case 'WEATHER_LOADING':
      return { ...state, loading: true }
    case 'WEATHER_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'WEATHER_SET_DATA':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'WEATHER_SET_LOCATION_URL':
      return {
        ...state,
        locationUrl: action.payload,
      }
    default:
      return state
  }
}
