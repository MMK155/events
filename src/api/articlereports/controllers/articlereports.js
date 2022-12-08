module.exports = {
  async index(ctx, next) {
    const { id, } = ctx.params;
    const entries = await strapi.db.query('api::article.article').findMany({
      where: { type: 'public' },
    });
  //array for change return  data format
  const attributeArray = [];
    entries.map((item) => {
      attributeArray.push({
        "id": item.id,
        "attributes": {
          "title": item.title,
          "type": item.type,
          "createdAt": item.createdAt,
          "updatedAt": item.updatedAt,
          "publishedAt": item.publishedAt,
          "media_type": item.media_type,
          "url": item.url,
          "text": item.text,
        }
      });
    });
    return attributeArray;
  }
}