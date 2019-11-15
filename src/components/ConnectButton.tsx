import React, { FC, useCallback } from 'react'
import Button from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import { useDisconnect, usePort } from './serial'

const ConnectButton: FC = () => {
  const disconnect = useDisconnect()
  const [port, setPort] = usePort()

  const onClick = useCallback(() => {
    disconnect().then(() => {
      if (!port) {
        navigator.serial
          .requestPort({})
          .then(port => {
            console.log('port!', port)
            setPort(port)
          })
          .catch(e => console.error(e))
      }
    })
  }, [Boolean(port)])

  return (
    <Button
      style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      id="connect-button"
      variant="round"
      disabled={Boolean(port)}
      color="primary"
      onClick={onClick}
    >
      <Typography variant="h5">+</Typography>
    </Button>
  )
}

export default ConnectButton
