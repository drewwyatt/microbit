/**
 * IO
 */

export type SerialOptions = {
  baudrate: number
}

export type SerialPort = {
  open(options: SerialOptions): Promise<void>
}

export type Serial = {
  requestPort(options: object): Promise<SerialPort>
}

declare global {
  interface Navigator {
    serial: Serial
  }
}

/**
 * Screen
 */

export type LEDState = 1 | 0
export type ScreenState = readonly [
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
  LEDState,
]
