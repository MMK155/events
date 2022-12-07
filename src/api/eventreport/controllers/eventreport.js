module.exports = {
  async index(ctx, next) {
    // const { pid, } = ctx.params;
    // console.log("param_id", pid);
    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id','title','testbug'],
      select: ['id','title','testbug'],
      populate: { event: true },
      where: { id: 76 },  
    });

    ctx.body = entries;
  
  },

  async contributorEvents(ctx, next) {
    // const { pid, } = ctx.params;
    // console.log("param_id", pid);
    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id','title','testbug'],
      select: ['id','title','testbug'],
      populate: { event: true },
      where: { id: 76 },  
    });
    ctx.body = entries;
  }


  //udpate participants status 

};
