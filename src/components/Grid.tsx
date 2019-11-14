import React, { FC } from 'react'
import Card from '@material-ui/core/Card'
import Checkbox from '@material-ui/core/Checkbox'

const LED: FC = () => <Checkbox color="primary" />

const Centerer: FC = ({ children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    {children}
  </div>
)

const Grid: FC = () => (
  <Centerer>
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
        .fill(LED)
        .map((C, idx) => (
          <C key={idx} />
        ))}
    </Card>
  </Centerer>
)

export default Grid
