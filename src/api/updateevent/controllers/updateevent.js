module.exports = {
  async index(ctx, next) {
    const { pid, } = ctx.params;
    console.log("param_id", pid);
    
    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id', 'notes', 'participants'],
      select: ['id', 'notes', 'participants'],

      populate: { category: true },
      where: { id: pid },
    });
    // ctx.body = entries;

    //get objects participants from a entries array  
    const getobjects = entries[0].participants;
    const ExtractObjectFromArray = Object.values(getobjects);


    //get participants object from ExtractObjectFromArray
    if(pid){
      var filter1 = ExtractObjectFromArray.filter(function (value, index, arr) {
        return value.attributes;
      });
      }

     //get status true participants 
      var ExtractStatusTrueObject = ExtractObjectFromArray.filter(function (value, index, arr) {
        return value.attributes.status == true;
      });
  
      //return status true participants 
      if(ExtractStatusTrueObject){
          return ExtractStatusTrueObject;
      }
  },

  async updateEvent(ctx, next){
     //update participants status
     const entry = await strapi.entityService.update('api::event.event', 73, {
  data: {
    users: "17",
  },
});
  },

 


 
};
