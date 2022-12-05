module.exports = {
    async index(ctx, next) {
    //   const { pid, } = ctx.params;
    //   console.log("param_id", pid);
      
      const entries = await strapi.db.query('api::user.user').findMany({
        fields: ['id', 'email'],
        select: ['id', 'emaqil'],
  
        populate: { category: true },
        where: { id: '15' },
      });
      ctx.body = entries;

  };
}