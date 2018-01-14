import { createSelector } from 'reselect'


export const getCountFromState = (state) => state.model.count;

export const getCount = createSelector(
  [getCountFromState],
  (count) => count,
)
