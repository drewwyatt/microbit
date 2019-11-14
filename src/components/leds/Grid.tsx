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
    <div
      style={{
        position: 'relative',
        width: '400px',
      }}
    >
      <Card
        raised
        color="main"
        style={{
          display: 'grid',
          height: '270px',
          gridTemplateColumns: 'repeat(5, 1fr)',
        }}
      >
        {LEDs.map((state, idx) => (
          <Toggle id={idx} state={state} onToggle={onToggle} key={idx} />
        ))}
      </Card>
      <PresetButton direction={CycleDirection.Backward} onClick={prevPreset} />
      <PresetButton direction={CycleDirection.Forward} onClick={nextPreset} />
    </div>
  )
}

export default Grid
