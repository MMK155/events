module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/confirmattendance/:pid',
     handler: 'confirmattendance.index',
    },
    { // Path defined with an URL parameter
      method: 'PUT',
      path: '/confirmattendance/:id/:cid', 
      handler: 'confirmattendance.updateparticipant',
    },
  ],
};