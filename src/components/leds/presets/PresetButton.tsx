import React, { FC } from 'react'
import Button from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'

export enum CycleDirection {
  Forward = '>',
  Backward = '<',
}

type Props = {
  direction: CycleDirection
  onClick(): void
}

const toHorizontalStyle = (direction: CycleDirection) => ({
  [direction === CycleDirection.Backward ? 'left' : 'right']: '0',
  transform: `translate(${
    direction === CycleDirection.Backward ? '-140%' : '140%'
  }, -50%)`,
})

const PresetButton: FC<Props> = ({ direction, onClick }) => (
  <Button
    style={{
      position: 'absolute',
      top: '50%',
      ...toHorizontalStyle(direction),
    }}
    variant="extended"
    color="secondary"
    onClick={onClick}
  >
    <Typography variant="h5">{direction}</Typography>
  </Button>
)

export default PresetButton
