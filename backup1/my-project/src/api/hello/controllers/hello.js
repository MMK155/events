module.exports = {
  async index(ctx, next) {
    const {id} = ctx.params;
    console.log("param_id",id);
    const entries = await strapi.db.query('api::demo.demo').findMany({
      fields: ['id', 'description','participants'],
      select:['id','detail','participants'],
      if(participants){
          const {id} = participants;
          console.log("id",id);
      },
      populate: { category: true },
      where: {id:id},
    });
    ctx.body = entries;
    //console.log("entries",entries[0].participants[0].id);
    // console.log("entries",entries[0].participants);
   
    const uncofirm_array = [];
    const uncofirm = entries[0].participants;
   
    const testobj = Object.values(uncofirm);
    // console.log("testobj",testobj);

    // uncofirm_array.push(testobj);

    // console.log("uncofirm_array",uncofirm_array);
    
    // console.log("testobj",testobj[id]);
    var a;
    var result = testobj.find(obj => {
      return obj.id === 6
    })
    
 
    //This is filter 1 for update the particpant status
    var filter1 = testobj.filter(function(value, index, arr){ 
      return value.id === 5;
    }); 
    console.log("filter1",filter1);
    let filter1_obj_for_udpate = {
     
       
        "id": 5,
        "attributes": {
        "name": "",
        "tags": [
        {
        "id": 1,
        "title": ""
        }
        ],
        "email": "",
        "status": false,
        "contact": "",
        "createdAt": "",
        "updatedAt": "2022-11-20T12:29:53.048Z",
        "publishedAt": "2022-11-18T12:36:01.595Z"
        }
       
  }
    console.log("Attribute",filter1[0].attributes.name);

    if(filter1){
    
    filter1_obj_for_udpate["id"] = filter1[0].id,
    filter1_obj_for_udpate["attributes"]["name"] = filter1[0].attributes.name, 
    filter1_obj_for_udpate["attributes"]["tags"] = filter1[0].attributes.tags,
    filter1_obj_for_udpate["attributes"]["email"] = filter1[0].attributes.email,
    filter1_obj_for_udpate["attributes"]["status"] = "truebyme",
    filter1_obj_for_udpate["attributes"]["contact"] = filter1[0].attributes.contact,
    filter1_obj_for_udpate["attributes"]["createdAt"] = filter1[0].attributes.createdAt,
    filter1_obj_for_udpate["attributes"]["updatedAt"] = filter1[0].attributes.updatedAt,
    filter1_obj_for_udpate["attributes"]["publishedAt"] = filter1[0].attributes.publishedAt
    }  

    console.log("Final Update",filter1_obj_for_udpate);
    //This is filter2 to fetch rest of particapnts without update 
    var filter2 = testobj.filter(function(value, index, arr){ 
      return value.id !== 5;
    }); 
    console.log("filter2",filter2);

  
   
  

    
    // console.log("result",result);
   
    // uncofirm_array.pull(result); // removed

    // console.log("Uncofirm_array",uncofirm_array);

    // cover_uni_to_obj = Object.values(uncofirm_array);
    // console.log("cover_uni_to_obj",cover_uni_to_obj);
    // var remove_result = cover_uni_to_obj.find(obj => {
    //   return obj.id === 6
    // })

    // console.log("Remove_result",remove_result);

    // console.log("uncofirm",uncofirm);

    // for (a in uncofirm) {
    //     console.log(uncofirm[a].id + " " + Object.values(uncofirm[a].attributes)); 
    //     // const singleobject = [];
    //     // singleobject.push(uncofirm[a].id + " " + Object.values(uncofirm[a].attributes));
    //     // console.log("singleobject",singleobject);
    //     // if(uncofirm[a].id == 7){
    //     //   console.log("uni here",uncofirm[a].id == 7);
    //     // }      
    // }
  }
};
