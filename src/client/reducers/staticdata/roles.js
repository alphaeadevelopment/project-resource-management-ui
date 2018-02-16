
const initial = {
  all: {
    'pm': {
      name: 'Project Manager',
      rate: '500',
    },
    'analyst': {
      name: 'Business Analyst',
      rate: '450',
    },
    'dev': {
      name: 'Developer',
      rate: '400',
    },
    'arch': {
      name: 'Architect',
      rate: '500',
    },
  },
};
export default (state = initial, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
