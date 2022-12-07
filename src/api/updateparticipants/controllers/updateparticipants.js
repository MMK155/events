module.exports = {
  //udpate participants status 
  async updateparticipants(ctx, next) {
    const { data } = ctx.request.body;
    const { participants,start_datetime,title,notes,event_duration,users } = data;
    console.log("start_datetime",start_datetime);
    
    const { id } = ctx.params;

    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id', 'notes', 'participants'],
      select: ['id', 'notes', 'participants'],
      populate: { category: true },
      where: { id: id },
    });

     //get objects participants from a entries array  
     const getObjects = entries[0].participants;
     const ExtractObjectFromArray = Object.values(getObjects);

   

    
  let current_participants = ExtractObjectFromArray;
  let new_participants = participants;

    //check participants difference with new participants
    function getDifference(array1, array2) {
      return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    }
    
    const difference = [
      ...getDifference(new_participants, current_participants),
       ...ExtractObjectFromArray
    ];    
  
    //update particpants
    const entry = await strapi.db.query('api::event.event').update({
      where: { id: id },
      data: {
        participants: difference,
        start_datetime:start_datetime,
        title:title,
        notes:notes,
        event_duration:event_duration,
        users:users
      },
    });
    ctx.body = entry;
  }
};
