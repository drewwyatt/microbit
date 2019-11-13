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
