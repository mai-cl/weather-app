import {
  AppBar,
  Autocomplete,
  Box,
  Container,
  Icon,
  InputAdornment,
  Switch,
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

const url = process.env.REACT_APP_WEATHERAPI_URL
const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY

const Header = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'))
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
          data.map(item => ({
            label: `${item.name}, ${item.region}, ${item.country}`,
            url: item.url,
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' noWrap component='div'>
            Weather App
          </Typography>
          <Box sx={{ flex: '0 1 480px' }}>
            <Autocomplete
              size={matchesLg ? 'medium' : 'small'}
              options={options}
              freeSolo
              filterOptions={(options, state) => options}
              onChange={handleChangeValue}
              onInputChange={handleChangeInput}
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
          <Switch defaultChecked={false} color='secondary' />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
