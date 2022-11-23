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


  //udpate participants status 
  async updateparticipant(ctx, next){
    const { id,cid } = ctx.params;

    //get participant for update
    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id', 'notes', 'participants'],
      select: ['id', 'notes', 'participants'],
      where: { id: id },
    });
    ctx.body = entries;
   

    //Array for participants
    const unconfirm_array = [];
    
    //Get participant 
    const unconfirm = entries[0].participants;

    //conver array elements to object 
    const convertToObject = Object.values(unconfirm);
  
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

    //update participants status
    const entry = await strapi.db.query('api::event.event').update({
      where: { id: id },
      data: {
        participants:ConfirmParticapantsArray
      },
    });
    ctx.body = entry;

  } 
  }
};
