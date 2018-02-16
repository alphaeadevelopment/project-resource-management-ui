import keys from 'lodash/keys';

export default (locations) => {
  return keys(locations).map((l) => {
    const loc = locations[l];
    return ({ id: l, value: l, display: loc.name });
  });
};
