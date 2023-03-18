import { Box, Typography } from '@mui/material'
import React from 'react'

const Error404 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        rowGap: 2,
        height: '450px',
      }}
    >
      <Typography variant='h1' textAlign='center'>
        404
      </Typography>
      <Typography variant='h6' textAlign='center'>
        Página no encontrada
      </Typography>
    </Box>
  )
}

export default Error404
