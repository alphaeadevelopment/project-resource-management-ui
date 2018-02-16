import keys from 'lodash/keys';
import has from 'lodash/has';

export default (resources, value) => {
  let resourceList = resources;
  if (value && !has(resources, value.id)) {
    resourceList = { ...resources, [value.id]: value };
  }
  return keys(resourceList).map((r) => {
    const resource = resourceList[r];
    return ({ id: r, value: r, display: resource.name });
  });
};
