module.exports = {
  async index(ctx, next) {
    const entries = await strapi.db.query('api::demo.demo').findMany({
      where: {
        // authors: {
        //   hobby: {
        //     $contains: 'Dance'
        //   },
        // }
      },
    });
    ctx.body = entries;
  }
};
