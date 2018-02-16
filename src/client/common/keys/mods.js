import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';

import isKey from './is-key';

export const CTRL = 'ctrl';
export const ALT = 'alt';
export const SHIFT = 'shift';
export const META = 'meta';

export const Codes = {
  [SHIFT]: 16,
  [CTRL]: 17,
  [ALT]: 18,
  [META]: 91,
};

export const isModKey = isKey(Codes);
export const isShiftKey = k => k === Codes.SHIFT;
export const isCtrlKey = k => k === Codes.CTRL;
export const isAltKey = k => k === Codes.ALT;
export const isMetaKey = k => k === Codes.META;

export const activeMods = (e) => {
  const mods = {
    meta: e.metaKey,
    alt: e.altKey,
    ctrl: e.ctrlKey,
    shift: e.shiftKey,
  };
  return keys(pickBy(mods, v => v));
};
