import { createContext, Reducer, Dispatch } from 'react'
import { SerialPort } from '../../models'

type State = {
  port?: SerialPort
  inputStream?: ReadableStreamDefaultReader
  inputDone?: Promise<void>
  outputStream?: WritableStream<any>
  outputDone?: Promise<void>
  buttonCallbacks?: [() => void, () => void]
}

export const Context = createContext<[State, Dispatch<Action>]>(undefined)

const set = <T extends keyof State>(key: T) => (value: State[T]) =>
  ({
    type: 'set',
    payload: { key, value },
  } as const)

type Action = ReturnType<ReturnType<typeof set>>

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, [action.payload.key]: action.payload.value }
    default:
      return state
  }
}

export const setPort = set('port')

export const setInputStream = set('inputStream')

export const setInputDone = set('inputDone')

export const setOutputStream = set('outputStream')

export const setOutputDone = set('outputDone')

export const setCallbacks = set('buttonCallbacks')
