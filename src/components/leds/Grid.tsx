import React, { FC, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import presets, { CycleDirection, PresetButton, usePresets } from './presets'
import Toggle from './toggle'
import useLEDs from './useLEDs'

const Grid: FC = () => {
  const [LEDs, [onToggle, applyPreset]] = useLEDs()
  const [preset, [prevPreset, nextPreset]] = usePresets(presets)

  useEffect(() => {
    applyPreset(preset)
  }, [preset])

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
      <PresetButton direction={CycleDirection.Backward} onClick={prevPreset} />
      <PresetButton direction={CycleDirection.Forward} onClick={nextPreset} />
    </Card>
  )
}

export default Grid
