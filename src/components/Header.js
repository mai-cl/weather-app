import {
  alpha,
  AppBar,
  Container,
  InputBase,
  styled,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { useState } from 'react'

const SearchBox = styled('div')(({ theme }) => ({
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
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

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

const Header = () => {
  const [inputLocation, setInputLocation] = useState('')

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
          <SearchBox>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search'
              inputProps={{ 'aria-label': 'search' }}
              value={inputLocation}
              onChange={e => setInputLocation(e.target.value)}
            />
          </SearchBox>
          <Switch defaultChecked={false} color='secondary' />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
