import keys from 'lodash/keys';

export default (roles) => {
  return keys(roles).map((r) => {
    const role = roles[r];
    return ({ id: r, value: r, display: role.name });
  });
};
