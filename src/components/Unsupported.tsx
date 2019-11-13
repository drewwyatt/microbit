import React, { FC } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const Unsupported: FC = () => (
  <Card>
    <Typography component="h3" variant="h5">
      WebSerial is unsupported in the browser.
    </Typography>
  </Card>
)

export default Unsupported
