import { Box, Container, Tab, Tabs } from '@mui/material'
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom'

function useRouteMatch(patterns) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

const Navbar = () => {
  const routeMatch = useRouteMatch(['/today', '/hourly', '/days'])
  const currentTab = routeMatch?.pattern?.path

  return (
    <Container component='nav' sx={{ marginBottom: '20px', marginTop: '20px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} aria-label='basic tabs example'>
          <Tab
            label='Today'
            value='/today'
            to='/today'
            component={RouterLink}
          />
          <Tab
            label='Hourly'
            value='/hourly'
            to='/hourly'
            component={RouterLink}
          />
          <Tab label='3 Days' value='/days' to='/days' component={RouterLink} />
        </Tabs>
      </Box>
    </Container>
  )
}

export default Navbar
