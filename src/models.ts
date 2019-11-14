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

export enum LEDState {
  On = 1,
  Off = 0,
}
export type ScreenState = readonly LEDState[]
