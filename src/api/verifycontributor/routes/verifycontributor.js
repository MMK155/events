module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/verifycontributor',
     handler: 'verifycontributor.verify',
    }
    // { // Path defined with an URL parameter
    //   method: 'PUT',
    //   path: '/confirmattendance/:id/:cid', 
    //   handler: 'confirmattendance.updateparticipant',
    // },
  ],
};