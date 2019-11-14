import { useCallback, useState } from 'react'
import { ScreenState } from '../../../models'

const usePresets = (presets: ScreenState[]) => {
  const [idx, setIdx] = useState(0)
  const previous = useCallback(() => setIdx(idx - 1 < 0 ? presets.length - 1 : idx - 1), [
    idx,
    presets.length,
  ])

  const next = useCallback(() => setIdx((idx + 1) % presets.length), [
    idx,
    presets.length,
  ])

  return [presets[idx], [previous, next]] as const
}

export default usePresets
