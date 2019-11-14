import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export enum CycleDirection {
  Forward = '>',
  Backward = '<',
}

type Props = {
  direction: CycleDirection
  onClick(): void
}

const PresetButton: FC<Props> = ({ direction, onClick }) => (
  <Button color="secondary" onClick={onClick}>
    <Typography variant="h5">{direction}</Typography>
  </Button>
)

export default PresetButton
