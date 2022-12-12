module.exports = {
  async index(ctx, next) {
    const { pid, } = ctx.params;
    const user = ctx.state.user;

    const attributesArray = []  
    const userEventArray = [];

    //get logged in user
    const entry = await strapi.entityService.findOne('plugin::users-permissions.user',user.id, {
      fields: ['email'],
      populate: { category: true },
    });


    //get logged in user events
    const getUserEvents = await strapi.db.query('api::event.event').findMany({
      fields: ['id', 'notes', 'participants'],
      select: ['id', 'notes', 'participants'],
      where: { users: user.id },
      populate: { category: true } 
    });
    
    //get requested id participants
      const keys = [pid]; 
      const filterByPid = (getUserEvents = [], keys = []) => {
        const res = getUserEvents.filter(function(item) {
          const thisObj = this;
           return item.participants.some(leg => {
              return thisObj[leg.id];
           });
        }, keys.reduce((acc, val) => {
           acc[val] = true;
           return acc;
        }, Object.create(null)));
        return res;
     }
     const userEvents = filterByPid(getUserEvents,keys);

     
     //store events id in Array
     userEvents.map((item)=>{
      userEventArray.push(item.id);
     });
     
     //get user events events 
     if(userEventArray.length > 0){
        const getEvents = await strapi.db.query('api::event.event').findMany({
          fields: ['id','participants','event_duration','end_date_time','title'],
          select: ['id','participants','event_duration','end_date_time','title'],
          where: { id:userEventArray },
          populate: { category: true } 
        });
  
    if(pid){
     getEvents.map((item) => {
      //get participants by id in each event
      const {participants} = item;
      var filtered = participants.filter((value)=>{
        return value.id == pid;
      });

      const status=filtered[0].attributes.status;
      const attendance=filtered[0].attributes.attendance;
      attributesArray.push({
          "id": item.id,
          "status": status,
          "attendance":attendance,
          "title": item.title,
          "event_duration": item.event_duration,
          "end_date_time": item.end_date_time
      });
    });
 
      return attributesArray;
    }
  }  
  }
};
