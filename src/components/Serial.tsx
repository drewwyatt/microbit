import React, {
  FC,
  createContext,
  useContext,
  Reducer,
  useReducer,
  Dispatch,
  useCallback,
} from 'react'
import { SerialPort } from '../models'

type State = {
  port?: SerialPort
}

type Action = ReturnType<typeof setPort>

const SerialContext = createContext<[State, Dispatch<Action>]>(undefined)

const setPort = (payload: SerialPort) => ({ type: 'setPort', payload } as const)

const serialReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setPort':
      return { ...state, port: action.payload }
    default:
      return state
  }
}

const SerialProvider: FC = ({ children }) => (
  <SerialContext.Provider value={useReducer(serialReducer, {})}>
    {children}
  </SerialContext.Provider>
)

export const usePort = () => {
  const [state, dispatch] = useContext(SerialContext)
  return [
    state.port,
    useCallback((port: SerialPort) => {
      port.open({ baudrate: 9600 }).then(() => dispatch(setPort(port)))
    }, []),
  ] as const
}

export default SerialProvider
