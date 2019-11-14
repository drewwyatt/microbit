import React, { FC } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const Unsupported: FC = () => (
  <Card style={{ background: '#b00020', padding: '20px' }}>
    <Typography style={{ color: '#fff' }} component="h3" variant="h5">
      WebSerial is unsupported in this browser
    </Typography>
  </Card>
)

export default Unsupported
