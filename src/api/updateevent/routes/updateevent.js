module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/updateevent/:pid',
     handler: 'updateevent.index',
    },
    { // Path defined with an URL parameter
      method: 'PUT',
      path: '/updateevent', 
      handler: 'updateevent.updateEvent',
    },
  ],
};