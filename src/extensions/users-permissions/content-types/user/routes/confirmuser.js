module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/confirmuser',
       handler: 'confirmuser.index',
      }
    //   { // Path defined with an URL parameter
    //     method: 'PUT',
    //     path: '/confirmattendance/:id/:cid', 
    //     handler: 'confirmattendance.updateparticipant',
    //   },
    ],
  };