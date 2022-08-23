import { isFunction } from 'lodash'
import { createContext, useContext, useReducer } from 'react'
import { weatherData } from './reducers'

const StateContext = createContext()

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enhancedDispatch = action => {
    if (isFunction(action)) {
      action(dispatch)
    } else {
      dispatch(action)
    }
  }

  return [state, enhancedDispatch]
}

const initialState = {
  location: 'Guyana',
  data: null,
  loading: true,
  error: null,
}

export const StateProvider = ({ children }) => {
  const [store, dispatch] = useThunkReducer(weatherData, initialState)

  return (
    <StateContext.Provider value={{ store, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export const useAppState = () => {
  const { store, dispatch } = useContext(StateContext)
  return { store, dispatch }
}
