import {
  AppBar,
  Autocomplete,
  Box,
  Container,
  Icon,
  InputAdornment,
  InputBase,
  styled,
  Switch,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { fetchWeatherData, setLocation } from '../actions'
import { useAppState } from '../context'

const url = process.env.REACT_APP_WEATHERAPI_URL
const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY

/* const SearchBox = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
})) */

/* const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) */

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '320px',
  '& > div': {
    backgroundColor: '#fff',
  },
}))

const Header = () => {
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
          data.map(item => `${item.name}, ${item.region} - ${item.country}`)
        )
      })
      .catch(error => {
        console.error(error)
      })
  }, [debouncedLocation])

  const handleSearchLocation = e => {
    e.preventDefault()
    console.log('handleSearchLocation', inputLocation)

    dispatch(setLocation(inputLocation))
  }

  const handleChangeValue = (event, value) => {
    if (!value) return
    dispatch(setLocation(value))
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
          <Box
            sx={{ flex: '0 1 480px' }}
            component='form'
            onSubmit={handleSearchLocation}
          >
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
