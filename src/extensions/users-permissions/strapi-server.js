module.exports = (plugin) => {
    plugin.controllers.user.newOneMethode = (ctx) => {
        console.log("Testing Users");
   

   
      const entries = strapi.db.query('api::users-permissions.user').findMany({
        fields: ['id', 'notes', 'participants'],
        select: ['id', 'notes', 'participants'],
  
        populate: { category: true },
        where: { id: '15' },
      });  

      const entry = await strapi.entityService.findOne('api::article.article', 1, {
        fields: ['title', 'description'],
        populate: { category: true },
      });

    } 
    plugin.routes['content-api'].routes.push({
        method:'GET',
        path:'/user/testuser',
        handler:'user.newOneMethode',
        config:{
            prefix:''
        }
    });
    return plugin;
}