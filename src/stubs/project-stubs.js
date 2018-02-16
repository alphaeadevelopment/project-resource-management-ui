const getAllProjects = () => ({
  items: [
    {
      id: 1,
      name: 'Risk Models',
    },
    {
      id: 2,
      name: 'Raven',
    },
  ],
});

export default ([
  {
    method: 'GET',
    path: /\/prj\/projects/,
    value: getAllProjects,
  },
]);
