import { Box, Container, Tab, Tabs } from '@mui/material'
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom'

import { useAppState } from '../context'

function useRouteMatch(patterns) {
  const { pathname: browserPathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern.pathname, browserPathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

const patterns = [
  {
    pathname: '/today/:locationUrl',
    tabIndex: 0,
  },
  {
    pathname: '/today',
    tabIndex: 0,
  },
  {
    pathname: '/hourly/:locationUrl',
    tabIndex: 1,
  },
  {
    pathname: '/hourly',
    tabIndex: 1,
  },
  {
    pathname: '/days/:locationUrl',
    tabIndex: 2,
  },
  {
    pathname: '/days',
    tabIndex: 2,
  },
]

const Navbar = () => {
  const routeMatch = useRouteMatch(patterns)

  const currentTab = routeMatch?.pattern?.path
  const {
    store: { locationUrl },
  } = useAppState()

  return (
    <Container component='nav' sx={{ marginBottom: '20px', marginTop: '20px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={
            patterns.find(pattern => pattern.pathname === currentTab)
              ?.tabIndex || 0
          }
          aria-label='basic tabs example'
        >
          <Tab
            label='Today'
            index={0}
            to={`/today/${locationUrl}`}
            component={RouterLink}
          />
          <Tab
            label='Hourly'
            index={1}
            to={`/hourly/${locationUrl}`}
            component={RouterLink}
          />
          <Tab
            label='3 Days'
            index={2}
            to={`/days/${locationUrl}`}
            component={RouterLink}
          />
        </Tabs>
      </Box>
    </Container>
  )
}

export default Navbar
