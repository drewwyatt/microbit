import React, { FC } from 'react'
import Card from '@material-ui/core/Card'
import Toggle from './toggle'

const Grid: FC = () => {
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
      {Array(25)
        .fill(Toggle)
        .map((C, idx) => (
          <C key={idx} />
        ))}
    </Card>
  )
}

export default Grid
