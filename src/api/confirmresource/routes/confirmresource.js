module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/confirmresource/:pid',
     handler: 'confirmresource.index',
    },
    { // Path defined with an URL parameter
      method: 'PUT',
      path: '/confirmresource/:id/:cid', 
      handler: 'confirmresource.updateparticipant',
    },
  ],
};