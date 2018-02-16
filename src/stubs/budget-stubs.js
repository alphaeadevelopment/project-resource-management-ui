import find from 'lodash/find';

const budgets = {
  1: [
    {
      id: '1.1',
      projectId: '1',
      name: 'Scenario 1',
      year: '2018',
      roles: [
        {
          id: '1.1.1',
          location: 'in',
          role: 'pm',
          budget: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          allocations: [
            {
              resource: 'jennyl1',
              forecast: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
              actual: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            },
            {
              resource: 'billst5',
              rate: 399,
              forecast: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
              actual: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            },
          ],
        },
      ],
    },
  ],
  2: [
    {
      id: '2.1',
      projectId: '2',
      name: 'Scenario 1',
      year: '2018',
      roles: [
        {
          id: '2.1.1',
          location: 'uk',
          role: 'pm',
          budget: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          allocations: [
            {
              resource: 'ankits7',
              forecast: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
              actual: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            },
          ],
        },
        {
          id: '2.1.2',
          location: 'uk',
          role: 'pm',
          rate: 499,
          budget: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          allocations: [
            {
              resource: 'ankurn5',
              rate: 399,
              forecast: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
              actual: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            },
          ],
        },
      ],
    },
    {
      id: '2.2',
      projectId: '2',
      name: 'Scenario 2',
      year: '2018',
      roles: [
        {
          id: '2.2.1',
          location: 'uk',
          role: 'pm',
          budget: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          allocations: [
            {
              resource: 'richardd1',
              forecast: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
              actual: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            },
          ],
        },
        {
          id: '2.2.2',
          location: 'uk',
          role: 'pm',
          rate: 499,
          budget: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          allocations: [
            {
              resource: 'annan1',
              rate: 399,
              forecast: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
              actual: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            },
          ],
        },
      ],
    },
  ],
};

const getProjectBudgets = projectId => ({
  items: budgets[projectId],
});
const getBudget = (projectId, budgetId) => {
  return find(budgets[projectId], b => b.id === budgetId);
};

export default ([
  {
    method: 'GET',
    path: /\/budgets\/budgets\/project\/(.*)/,
    value: getProjectBudgets,
  },
  {
    method: 'GET',
    path: /\/budgets\/budgets\/(.*?)\/(.*?)$/,
    value: getBudget,
  },
]);
