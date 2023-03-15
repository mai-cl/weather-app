import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import HourlyPage from './components/HourlyPage'
import MainContent from './components/MainContent'
import Navbar from './components/Navbar'
import NextDaysPage from './components/NextDaysPage'
import TodayPage from './components/TodayPage'
import { StateProvider } from './context'

function App() {
  const [themeColor, setThemeColor] = useState('light')

  const toggleThemeColor = () => {
    setThemeColor(prevState =>
      setThemeColor(prevState === 'light' ? 'dark' : 'light')
    )
  }

  const customTheme = createTheme({
    palette: {
      mode: themeColor,
    },
  })

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <StateProvider>
        <BrowserRouter>
          <Header toggleThemeColor={toggleThemeColor} themeColor={themeColor} />
          <Navbar />
          <Routes>
            <Route path='/' element={<MainContent />}>
              <Route index element={<Navigate replace to='/today' />} />
              <Route path='today' element={<TodayPage />}>
                <Route path=':locationUrl' element={<TodayPage />} />
              </Route>
              <Route path='hourly' element={<HourlyPage />}>
                <Route path=':locationUrl' element={<HourlyPage />} />
              </Route>
              <Route path='days' element={<NextDaysPage />}>
                <Route path=':locationUrl' element={<NextDaysPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </StateProvider>
    </ThemeProvider>
  )
}

export default App
