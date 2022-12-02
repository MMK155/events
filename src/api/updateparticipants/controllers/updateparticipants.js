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

      


    //get status true participants 
    var ExtractStatusTrueObject = ExtractObjectFromArray.filter(function (value, index, arr) {
      return value.attributes.status == true;
    });

    //return status true participants 
    if (ExtractStatusTrueObject) {
      return ExtractStatusTrueObject;
    }
  },


  //udpate participants status 
  async updateparticipants(ctx, next) {
    const { data } = ctx.request.body;
    const { participants } = data;
    const { id } = ctx.params;
    let ConfirmParticapantsArray = [];

    //get participant for update
    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id', 'notes', 'participants'],
      select: ['id', 'notes', 'participants'],
      where: { id: id },
    });
    ctx.body = entries;



    //Get participant objects from findMany
    const unconfirm = entries[0].participants;

    //convert array elements to object 
    const convertToObject = Object.values(unconfirm);
    console.log("convertToObject123", convertToObject);


    for (const i in convertToObject) {
      ConfirmParticapantsArray.push(convertToObject[i]);
    }
    //push updated participants from request.body 
    ConfirmParticapantsArray.push(participants);

    //update particpants
    const entry = await strapi.db.query('api::event.event').update({
      where: { id: id },
      data: {
        participants: ConfirmParticapantsArray
      },
    });
    ctx.body = entry;
  }
};
