module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/eventreport',
       handler: 'eventreport.index',
      },
    //   { // Path defined with an URL parameter
    //     method: 'PUT',
    //     path: '/confirmresource/:id/:cid', 
    //     handler: 'confirmresource.updateparticipant',
    //   },
    ],
  };