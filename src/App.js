import { CssBaseline } from '@mui/material'

import Header from './components/Header'
import Navbar from './components/Navbar'
import { StateProvider } from './context'

function App() {
  return (
    <>
      <CssBaseline />
      <StateProvider>
        <Header />
        <Navbar />
      </StateProvider>
    </>
  )
}

export default App
