import React, { FC, useCallback } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { LEDState } from '../../models'

type Props = {
  id: number
  state: LEDState
  onToggle(idx: number): void
}

const Toggle: FC<Props> = ({ id, state, onToggle }) => (
  <Checkbox
    checked={state === LEDState.On}
    onChange={useCallback(() => onToggle(id), [id, onToggle])}
    color="primary"
  />
)
export default Toggle
