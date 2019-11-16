import React, { FC, useContext, useReducer, useCallback, useEffect } from 'react'
import { SerialPort } from '../../models'
import { Context, reducer, setPort, setInputDone, setInputStream } from './state'

const SerialProvider: FC = ({ children }) => (
  <Context.Provider value={useReducer(reducer, {})}>{children}</Context.Provider>
)

export const usePort = () => {
  const [state, dispatch] = useContext(Context)
  return [
    state.port,
    useCallback(async (port: SerialPort) => {
      try {
        await port.open({ baudrate: 9600 })
        dispatch(setPort(port))
      } catch (e) {
        console.log('usePort.catch', e)
      }
    }, []),
  ] as const
}

export const useInputStream = () => {
  const [{ inputStream, inputDone, port }, dispatch] = useContext(Context)
  const readLoop = useCallback(async (reader: ReadableStreamDefaultReader) => {
    while (true) {
      const { value, done } = await reader.read()
      if (value) {
        console.log(value)
      }

      if (done) {
        console.log('[readLoop] DONE', done)
        reader.releaseLock()
        break
      }
    }
  }, [])

  const init = useCallback((port: ReturnType<typeof usePort>[0]) => {
    const decoder = new TextDecoderStream()
    dispatch(setInputDone(port.readable.pipeTo(decoder.writable)))
    const reader = decoder.readable.getReader()
    dispatch(setInputStream(reader))
    readLoop(reader)
  }, [])

  useEffect(() => {
    if (port) {
      init(port)
    }
  }, [!!port])

  return [inputStream, inputDone] as const
}

export const useOutputStream = () => {}

export const useStream = () => {
  const [port] = usePort()

  useEffect(() => {
    if (port) {
    }
  }, [[!!port]])
}

export const useDisconnect = () => {
  const [port, setPort] = usePort()
  return useCallback(() => {
    const closePort = () =>
      port && 'close' in port
        ? port.close().then(() => Promise.resolve(setPort(null)))
        : Promise.resolve()
    return Promise.all([closePort()])
  }, [port])
}

export default SerialProvider
