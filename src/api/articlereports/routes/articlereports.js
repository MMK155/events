module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/articlereports',
     handler: 'articlereports.index',    
    }
    // { // Path defined with an URL parameter
    //   method: 'PUT',
    //   path: '/articlerepots/:id/:cid', 
    //   handler: 'articlerepots.updateparticipant',
    // },
  ],
};