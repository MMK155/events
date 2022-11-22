module.exports = {
  async index(ctx, next) {
  },

  //udpate participants status 
  async updateparticipant(ctx, next){
    const { id,cid } = ctx.params;

    //get participant for update
    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id', 'notes', 'participants'],
      select: ['id', 'notes', 'participants'],
      populate: { category: true },
      where: { id: id },
    });
    ctx.body = entries;
    

    //Array for participants
    const uncofirm_array = [];
    
    //Get participant 
    const uncofirm = entries[0].participants;

    //conver array elements to object 
    const convertToObject = Object.values(uncofirm);
  
    // filter requested participant 
    if(cid){
    var filter1 = convertToObject.filter(function (value, index, arr) {
      return value.id == cid;
    });
    }

    //new obj for requested participant 
    let filter1_obj_for_udpate = {
      "id": '',
      "attributes": {
        "name": "",
        "email": "",
        "status": false,
        "contact": "",
        "createdAt": "",
        "updatedAt": "2022-11-20T12:29:53.048Z",
        "publishedAt": "2022-11-18T12:36:01.595Z"
      }

    }
 

    // Udpate status of  filter1_obj_for_udpate
    if (filter1) {
        filter1_obj_for_udpate["id"] = filter1[0].id,
        filter1_obj_for_udpate["attributes"]["name"] = filter1[0].attributes.name,
        filter1_obj_for_udpate["attributes"]["email"] = filter1[0].attributes.email,
        filter1_obj_for_udpate["attributes"]["status"] = true,
        filter1_obj_for_udpate["attributes"]["contact"] = filter1[0].attributes.contact,
        filter1_obj_for_udpate["attributes"]["createdAt"] = filter1[0].attributes.createdAt,
        filter1_obj_for_udpate["attributes"]["updatedAt"] = filter1[0].attributes.updatedAt,
        filter1_obj_for_udpate["attributes"]["publishedAt"] = filter1[0].attributes.publishedAt
    }


    //get rest of the participants from participants array
    if(cid){
    var filter2 = convertToObject.filter(function (value, index, arr) {
      return value.id != cid;
    });
   

    //Array for combine all participants
    let ConfirmParticapantsArray = [];
    ConfirmParticapantsArray.push(filter1_obj_for_udpate);

    //get rest of participants from array
    for (const i in filter2) {    
        ConfirmParticapantsArray.push(filter2[i]); 
    }


    const entry = await strapi.db.query('api::event.event').update({
      where: { id: id },
      data: {
        participants:ConfirmParticapantsArray
      },
    });
  } 
  }
};
