import isKey from './is-key';

const ARROW_LEFT = 'ARROW_LEFT';
const ARROW_UP = 'ARROW_UP';
const ARROW_RIGHT = 'ARROW_RIGHT';
const ARROW_DOWN = 'ARROW_DOWN';

const arrowCodes = {
  [ARROW_LEFT]: 37,
  [ARROW_UP]: 38,
  [ARROW_RIGHT]: 39,
  [ARROW_DOWN]: 40,
};

export const Codes = {
  ...arrowCodes,
};

export const isArrowKey = isKey(arrowCodes);
