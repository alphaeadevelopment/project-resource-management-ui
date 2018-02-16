
const initial = {
  all: {
    'uk': {
      type: 'country',
      name: 'UK',
      rate: 1,
    },
    'in': {
      type: 'country',
      name: 'India',
      rate: 0.5,
    },
    'edi': {
      type: 'city',
      country: 'uk',
      name: 'Edinburgh',
      rate: 0.8,
    },
    'lon': {
      type: 'city',
      name: 'London',
      country: 'uk',
      rate: 1,
    },
    'del': {
      type: 'city',
      country: 'in',
      name: 'Delhi',
      rate: 0.5,
    },
    'chen': {
      type: 'city',
      country: 'in',
      name: 'Chennai',
      rate: 0.5,
    },
  },
};
export default (state = initial, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
