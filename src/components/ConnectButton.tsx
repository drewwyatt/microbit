import React, { FC, useCallback } from 'react'
import Button from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import { useDisconnect, useInputStream, usePort, useOutputStream } from './serial'

const ConnectButton: FC = () => {
  const disconnect = useDisconnect()
  const [port, setPort] = usePort()
  useInputStream()

  const onClick = useCallback(async () => {
    try {
      await disconnect()
      const p = await navigator.serial.requestPort()
      setPort(p)
    } catch (e) {
      console.error('caught at onClick', e)
    }
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
