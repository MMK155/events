module.exports = {
  async verify(ctx, next, plugin) {
    const { data: { email } } = ctx.request.body;


    //find all users
    const entity = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
    );


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





      //create requested contributor
      if (contributorArray.length > 0) {
        const createContributor = await strapi.db.query('api::contributor.contributor').create({
          data: {
            email: contributorArray[0],
            cid: contributorArray[1],
            username: contributorArray[2]
          },
        });

        ctx.send({
          message: 'contributor  created!',
          createContributor
        }, 201);

      } else {
        ctx.send({
          message: 'contributor Not Found'
        });
      }

    } else {
      console.log("Error");
    }

  }
};
