import { ScreenState } from '../../models'

// prettier-ignore
const V = [
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
  0, 0, 1, 0, 0,
] as const

// prettier-ignore
const A = [
  0, 0, 1, 0, 0,
  0, 1, 0, 1, 0,
  0, 1, 1, 1, 0,
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
] as const

// prettier-ignore
const N = [
  1, 0, 0, 0, 1,
  1, 1, 0, 0, 1,
  1, 0, 1, 0, 1,
  1, 0, 0, 1, 1,
  1, 0, 0, 0, 1,
] as const

// prettier-ignore
const E = [
  0, 1, 1, 1, 0,
  0, 1, 0, 0, 0,
  0, 1, 1, 0, 0,
  0, 1, 0, 0, 0,
  0, 1, 1, 1, 0,
] as const

// prettier-ignore
const S = [
  0, 1, 1, 1, 0,
  0, 1, 0, 0, 0,
  0, 1, 1, 1, 0,
  0, 0, 0, 1, 0,
  0, 1, 1, 1, 0,
] as const

// prettier-ignore
const HEART = [
  0, 1, 0, 1, 0,
  1, 0, 1, 0, 1,
  0, 0, 0, 0, 0,
  0, 1, 0, 1, 0,
  0, 0, 1, 0, 0,
] as const

const Presets: ScreenState[] = [V, A, N, E, S, S, A, HEART]
export default Presets
