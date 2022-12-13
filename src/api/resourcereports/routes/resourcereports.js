module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/resourcereports/:pid/:mid',
     handler: 'resourcereports.index',
    }
  ],
};