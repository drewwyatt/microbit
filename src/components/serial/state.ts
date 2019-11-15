import { createContext, Reducer, Dispatch } from 'react'
import { SerialPort } from '../../models'

type State = {
  port?: SerialPort
}

type Action = ReturnType<typeof setPort>

export const Context = createContext<[State, Dispatch<Action>]>(undefined)

export const setPort = (payload: SerialPort | null) =>
  ({ type: 'setPort', payload } as const)

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setPort':
      return { ...state, port: action.payload }
    default:
      return state
  }
}
