module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/hello/:pid/:sid',
       handler: 'hello.index',
      },
      {
        method: 'POST',
        path: '/hello/:pid/:sid',
        handler: 'hello.index',
       },
    ],
  };