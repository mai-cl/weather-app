import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import HourlyPage from './components/HourlyPage'
import MainContent from './components/MainContent'
import Navbar from './components/Navbar'
import NextDaysPage from './components/NextDaysPage'
import TodayPage from './components/TodayPage'
import { StateProvider } from './context'

function App() {
  return (
    <>
      <CssBaseline />
      <StateProvider>
        <BrowserRouter>
          <Header />
          <Navbar />
          <Routes>
            <Route path='/' element={<MainContent />}>
              <Route index element={<Navigate replace to='/today' />} />
              <Route path='/today' element={<TodayPage />} />
              <Route path='/hourly' element={<HourlyPage />} />
              <Route path='/days' element={<NextDaysPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StateProvider>
    </>
  )
}

export default App
