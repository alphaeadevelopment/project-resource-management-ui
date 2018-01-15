const getAllProjects = () => ({
  projects: [
    {
      id: 1,
      name: 'Risk Models',
    },
  ],
});

export default ([
  {
    method: 'GET',
    path: /\/projects/,
    value: getAllProjects,
  },
]);
