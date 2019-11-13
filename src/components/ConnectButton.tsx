import React, { FC, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { usePort } from './Serial'

const ConnectButton: FC = () => {
  const [port, setPort] = usePort()
  const onClick = useCallback(() => {
    navigator.serial
      .requestPort({})
      .then(port => {
        console.log('port!', port)
        setPort(port)
      })
      .catch(e => console.error(e))
  }, [])

  return port ? (
    <Button disabled>Connected</Button>
  ) : (
    <Button variant="contained" color="primary" onClick={onClick}>
      Connect
    </Button>
  )
}

export default ConnectButton
