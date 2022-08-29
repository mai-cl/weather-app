import { Container } from '@mui/material'
import React from 'react'
import { Outlet as RouterOutlet } from 'react-router-dom'

const MainContent = () => {
  return (
    <Container component='main'>
      <RouterOutlet />
    </Container>
  )
}

export default MainContent
