import { useCallback, useReducer, Reducer } from 'react'
import { LEDState, ScreenState } from '../../models'
import { OFF } from './presets/presets'

const flip = (led: LEDState): LEDState => (led === 1 ? 0 : 1)

const toggle = (idx: number) => ({ type: 'toggle', payload: idx } as const)
const set = (preset: ScreenState) => ({ type: 'set', payload: preset } as const)
type Action = ReturnType<typeof toggle | typeof set>

const reducer: Reducer<ScreenState, Action> = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return state.map((led, i) => (i === action.payload ? flip(led) : led))
    case 'set':
      return action.payload
  }
}

const useLEDs = () => {
  const [state, dispatch] = useReducer(reducer, OFF)
  const _toggle = useCallback(
    (...props: Parameters<typeof toggle>) => dispatch(toggle(...props)),
    [],
  )
  const applyPreset = useCallback(
    (...props: Parameters<typeof set>) => dispatch(set(...props)),
    [],
  )
  return [state, [_toggle, applyPreset]] as const
}

export default useLEDs
