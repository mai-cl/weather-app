import { Box, Container, Tab, Tabs } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container component='nav' sx={{ marginBottom: '20px', marginTop: '20px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab
            label='Today'
            {...a11yProps(0)}
            to='/today'
            component={RouterLink}
          />
          <Tab
            label='Hourly'
            {...a11yProps(1)}
            to='/hourly'
            component={RouterLink}
          />
          <Tab
            label='3 Day'
            {...a11yProps(2)}
            to='/days'
            component={RouterLink}
          />
        </Tabs>
      </Box>
    </Container>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default Navbar
