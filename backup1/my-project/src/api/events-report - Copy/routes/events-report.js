module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/events-report',
     handler: 'events-report.findAll',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};