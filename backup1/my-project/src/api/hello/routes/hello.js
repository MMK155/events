module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/hello/:id',
       handler: 'hello.index',
      },
    ],
  };