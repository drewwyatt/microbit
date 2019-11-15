import React, { FC, useContext, useReducer, useCallback } from 'react'
import { SerialPort } from '../../models'
import { Context, reducer, setPort } from './state'

const SerialProvider: FC = ({ children }) => (
  <Context.Provider value={useReducer(reducer, {})}>{children}</Context.Provider>
)

export const usePort = () => {
  const [state, dispatch] = useContext(Context)
  return [
    state.port,
    useCallback((port: SerialPort) => {
      port.open({ baudrate: 9600 }).then(() => dispatch(setPort(port)))
    }, []),
  ] as const
}

export const useDisconnect = () => {
  const [port, setPort] = usePort()
  return useCallback(() => {
    const closePort = () => port.close().then(() => Promise.resolve(setPort(null)))
    return Promise.all([closePort()])
  }, [port])
}

export default SerialProvider
