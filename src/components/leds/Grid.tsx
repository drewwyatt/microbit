import React, { FC } from 'react'
import Card from '@material-ui/core/Card'
import Toggle from './toggle'
import useLEDs from './useLEDs'

const Grid: FC = () => {
  const [LEDs, onToggle] = useLEDs()
  console.log('state', LEDs)
  return (
    <Card
      raised
      color="main"
      style={{
        display: 'grid',
        height: '270px',
        width: '400px',
        gridTemplateColumns: 'repeat(5, 1fr)',
      }}
    >
      {LEDs.map((state, idx) => (
        <Toggle id={idx} state={state} onToggle={onToggle} key={idx} />
      ))}
    </Card>
  )
}

export default Grid
