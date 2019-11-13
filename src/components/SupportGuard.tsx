import React, { ComponentType, FC } from 'react'

type Props = {
  fallback: ComponentType
}

const SupportGuard: FC<Props> = ({ children, fallback: Fallback }) =>
  typeof navigator !== 'undefined' && 'serial' in navigator ? (
    <>{children}</>
  ) : (
    <Fallback />
  )

export default SupportGuard
