// prettier-ignore
export const V = [
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
  0, 0, 1, 0, 0,
];

// prettier-ignore
export const A = [
  0, 0, 1, 0, 0,
  0, 1, 0, 1, 0,
  0, 1, 1, 1, 0,
  0, 1, 0, 1, 0,
  0, 1, 0, 1, 0,
];

// prettier-ignore
export const N = [
  1, 0, 0, 0, 1,
  1, 1, 0, 0, 1,
  1, 0, 1, 0, 1,
  1, 0, 0, 1, 1,
  1, 0, 0, 0, 1,
];

// prettier-ignore
export const E = [
  0, 1, 1, 1, 0,
  0, 1, 0, 0, 0,
  0, 1, 1, 0, 0,
  0, 1, 0, 0, 0,
  0, 1, 1, 1, 0,
];

// prettier-ignore
export const S = [
  0, 1, 1, 1, 0,
  0, 1, 0, 0, 0,
  0, 1, 1, 1, 0,
  0, 0, 0, 1, 0,
  0, 1, 1, 1, 0,
];

// prettier-ignore
export const HEART = [
  0, 1, 0, 1, 0,
  1, 0, 1, 0, 1,
  0, 0, 0, 0, 0,
  0, 1, 0, 1, 0,
  0, 0, 1, 0, 0,
];

enum Screen {
  V = 'V',
  A = 'A',
  N = 'N',
  E = 'E',
  S = 'S',
  Heart = 'HEART',
}

export default Screen
