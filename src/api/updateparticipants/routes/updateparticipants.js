module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'PUT',
      path: '/updateparticipants/:id', 
      handler: 'updateparticipants.updateparticipants',
    },
  ],
};