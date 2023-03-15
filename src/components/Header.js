import {
  AppBar,
  Autocomplete,
  Box,
  Container,
  Icon,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { setLocationUrl } from '../actions'
import { useAppState } from '../context'
import { useNavigate } from 'react-router-dom'
import ToggleThemeSwitch from './ToggleThemeSwitch'

const url = process.env.REACT_APP_WEATHERAPI_URL
const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY

const Header = ({ toggleThemeColor, themeColor }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'))
  const matches768px = useMediaQuery('(min-width: 768px)')
  const { dispatch } = useAppState()
  const [debouncedLocation, setDebouncedLocation] = useState('')
  const [inputLocation, setInputLocation] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedLocation(inputLocation)
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [inputLocation])

  useEffect(() => {
    if (!debouncedLocation) {
      setOptions([])
      return
    }

    fetch(`${url}/search.json?key=${apiKey}&q=${debouncedLocation}`)
      .then(response => response.json())
      .then(data => {
        setOptions(
          data.map((item, index) => ({
            label: `${item.name}, ${item.region}, ${item.country}`,
            url: item.url,
            key: item.url + index,
          }))
        )
      })
      .catch(error => {
        console.error(error)
      })
  }, [debouncedLocation])

  const handleChangeValue = (event, value, reason) => {
    if (!value) return

    if (reason === 'createOption') {
      navigate(`/today/${value}`)
      dispatch(setLocationUrl(value))
      return
    }

    navigate(`/today/${value.url}`)
    dispatch(setLocationUrl(value.url))
  }

  const handleChangeInput = (event, value) => {
    setInputLocation(value)
  }

  return (
    <AppBar
      position='static'
      sx={{ height: { lg: 80 }, justifyContent: 'center' }}
    >
      <Container>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
        >
          <Typography
            variant='h5'
            component='a'
            href='/'
            sx={{
              textDecoration: 'none',
              '&:visited': {
                color: 'currentcolor',
              },
            }}
            align='left'
            lineHeight={!matches768px ? '1.2' : null}
            fontSize={!matches768px ? '1rem' : null}
          >
            Weather App
          </Typography>

          <Box sx={{ flex: '0 1 420px' }}>
            <Autocomplete
              blurOnSelect
              size={matchesLg ? 'medium' : 'small'}
              options={options}
              freeSolo
              filterOptions={(options, state) => options}
              onChange={handleChangeValue}
              onInputChange={handleChangeInput}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.key}>
                    {option.label}
                  </li>
                )
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  sx={{
                    '& > div': {
                      backgroundColor: 'background.default',
                    },
                  }}
                  variant='outlined'
                  color='secondary'
                  placeholder='Search'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon>
                          <Search />
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <ToggleThemeSwitch
            checked={themeColor === 'dark'}
            onChange={toggleThemeColor}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
