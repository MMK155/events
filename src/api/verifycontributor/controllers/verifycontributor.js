module.exports = {
  async verify(ctx, next, plugin) {
    const { data: { email,user } } = ctx.request.body;
    console.log("user",user);

    //find all users
    const entity = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
    );

    // find all contributors
    const findContribtors = await strapi.db.query('api::contributor.contributor').findMany({
      fields: ['id', 'email'],
      select: ['id', 'email'],
      populate: { category: true },
    });

    console.log("findContribtors",findContribtors);

    

    const contributorArray = [];
    const filter_requsted_contributor = entity.filter(item => item.email === email);


    //push requestes user data in contributorArray
    //push email
    if (filter_requsted_contributor) {
      filter_requsted_contributor.map((item) => {
        contributorArray.push(item.email)
      });

      //push id
      if (filter_requsted_contributor) {
        filter_requsted_contributor.map((item) => {
          contributorArray.push(item.id)
        });
      }

      //push username
      if (filter_requsted_contributor) {
        filter_requsted_contributor.map((item) => {
          contributorArray.push(item.username)
        });
      }



      //check exist contributor 
      const filter_exist_contributor = findContribtors.filter(item => item.email === email);
      console.log("filter_exist_contributor",filter_exist_contributor);

      //create requested contributor
      if (contributorArray.length > 0) {
        const createContributor = await strapi.db.query('api::contributor.contributor').create({
          data: {
            email: contributorArray[0],
            cid: contributorArray[1],
            username: contributorArray[2],
            user:user,
            publishedAt:new Date().toISOString()
          },
        });

        console.log('createContributor',createContributor);

        ctx.send({
          message: 'contributor  created!',
          createContributor
        }, 201);

      } else {
        ctx.send({
          message: `User with given email doesn't Exist!`
        },404);
      }

    } else {
      console.log("Error");
    }

  }
};
