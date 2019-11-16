import React, { FC, useContext, useReducer, useCallback, useEffect, useRef } from 'react'
import { SerialPort } from '../../models'
import JSONTransformer from '../transforms/jsontransformer'
import LineBreakTransformer from '../transforms/linebreaktranformer'
import {
  Context,
  reducer,
  setPort,
  setInputDone,
  setInputStream,
  setOutputDone,
  setOutputStream,
  setCallbacks,
} from './state'

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
  const [{ inputStream, inputDone, port, buttonCallbacks }, dispatch] = useContext(
    Context,
  )

  const cb1 = useRef(() => {})
  const cb2 = useRef(() => {})

  useEffect(() => {
    if (buttonCallbacks && buttonCallbacks[0]) {
      console.log('setting cb1')
      cb1.current = buttonCallbacks[0]
    }
    if (buttonCallbacks && buttonCallbacks[1]) {
      console.log('setting cb2')
      cb2.current = buttonCallbacks[1]
    }
  }, [buttonCallbacks])

  const readLoop = useCallback(async (reader: ReadableStreamDefaultReader) => {
    while (true) {
      const { value, done } = await reader.read()
      if (value) {
        console.log(value)
        if (value.button) {
          console.log('button', value.button)
          if (value.button === 'BTN1') {
            cb1.current()
          } else {
            cb2.current()
          }
        }
      }

      if (done) {
        console.log('[readLoop] DONE', done)
        reader.releaseLock()
        break
      }
    }
  }, [])

  const init = useCallback(
    (port: ReturnType<typeof usePort>[0]) => {
      const decoder = new TextDecoderStream()
      dispatch(setInputDone(port.readable.pipeTo(decoder.writable)))
      const reader = decoder.readable
        .pipeThrough(new TransformStream(new LineBreakTransformer() as any))
        .pipeThrough(new TransformStream(new JSONTransformer() as any))
        .getReader()

      dispatch(setInputStream(reader as any))
      readLoop(reader as any)
    },
    [readLoop],
  )

  useEffect(() => {
    if (port && !inputStream && !inputDone) {
      console.log('init read')
      init(port)
    }
  }, [!!port, !!inputStream, !!inputDone])

  return [inputStream, inputDone] as const
}

export const useOutputStream = () => {
  const [{ inputStream, outputDone, outputStream, port }, dispatch] = useContext(Context)

  const write = (stream: typeof outputStream, ...lines: string[]) => {
    const writer = stream.getWriter()
    lines.forEach(line => {
      console.log('[SEND]', line)
      writer.write(line + '\n')
    })
    writer.releaseLock()
  }

  const writeToStream = useCallback(
    (...lines: string[]) => {
      if (outputStream) {
        write(outputStream, ...lines)
      }
    },
    [!!outputStream],
  )

  const init = useCallback((port: ReturnType<typeof usePort>[0]) => {
    const encoder = new TextEncoderStream()
    write(encoder.writable, '\x03', 'echo(false);')
    dispatch(setOutputDone(encoder.readable.pipeTo(port.writable)))
    dispatch(setOutputStream(encoder.writable))
  }, [])

  useEffect(() => {
    if (port && inputStream && !outputStream && !outputDone) {
      console.log('init write')
      init(port)
    }
  }, [!!port, !!outputDone, !!outputStream, !!inputStream])

  return writeToStream
}

export const useButtons = (
  write: ReturnType<typeof useOutputStream>,
  cb1: () => void,
  cb2: () => void,
) => {
  const [, dispatch] = useContext(Context)
  const cmd = (btnId: string) => `
    setWatch(function(e) {
      print('{"button": "${btnId}", "pressed": ' + e.state + '}');
    }, ${btnId}, {repeat:true, debounce:20, edge:"both"});
  `

  useEffect(() => {
    write(cmd('BTN1'), cmd('BTN2'))
  }, [write])

  useEffect(() => {
    console.log('setting callbacks...')
    dispatch(setCallbacks([cb1, cb2]))
  }, [cb1, cb2])
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
