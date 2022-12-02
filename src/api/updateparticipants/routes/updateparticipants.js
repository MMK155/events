module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/updateparticipants/:pid',
     handler: 'updateparticipants.index',
    },
    { // Path defined with an URL parameter
      method: 'PUT',
      path: '/updateparticipants/:id', 
      handler: 'updateparticipants.updateparticipants',
    },
  ],
};