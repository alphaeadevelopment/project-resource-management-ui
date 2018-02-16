import includes from 'lodash/includes';
import values from 'lodash/values';

export default (codeMap) => {
  const allCodes = values(codeMap);
  return k => includes(allCodes, k);
};
