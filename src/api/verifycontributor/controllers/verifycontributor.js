module.exports = {
  async verify(ctx,next,plugin) {
    const { data:{email} } = ctx.request.body;
    console.log('email',email);
    
    //verify contributor
    const entity = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
    );
      

    //verify contributior email
    var filter1= entity.filter(function (value, index, arr) {
      return value;
    });



    const testobj = [];
    const filter_requsted_contributor =  filter1.filter(item => item.email === email);
    //get filter contributor detail 
    if(filter_requsted_contributor){
     filter_requsted_contributor.map((item)=>{
      testobj.push(item.email)
    });

    //get filter contributor detail 
    if(filter_requsted_contributor){
      filter_requsted_contributor.map((item)=>{
       testobj.push(item.id)
       
     });
    }

     if(filter_requsted_contributor){
      filter_requsted_contributor.map((item)=>{
       testobj.push(item.username)
     });
    }


    // testobj.push(item.id),
    //   testobj.push(item.username),
    console.log("testobj",testobj);
    console.log("Contributor Added Successfully");
    
    if(testobj.length > 0){
    const createContributor = await strapi.db.query('api::contributor.contributor').create({
      data: {
        email:testobj[0],
        cid:testobj[1],
        username:testobj[2]
      },
    })
  }else{
    console.log("Contributor Doest Exist");
  }


    }else{
      console.log("Error");
    }



    

  }
};
