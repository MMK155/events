module.exports = {
  async index(ctx, next) {
    const { pid,mid } = ctx.params;
    const user = ctx.state.user;

    const attributesArray = [];
    const userEventArray = [];
    let newArray = [];

    //get logged in user
    const entry = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      user.id,
      {
        fields: ["email"],
        populate: { category: true },
      }
    );

    //get logged in user events
    const getUserEvents = await strapi.db.query("api::event.event").findMany({
      fields: ["id", "notes", "participants"],
      select: ["id", "notes", "participants"],
      where: { users: user.id },
      populate: { category: true },
    });

    //get requested id participants
    const keys = [pid];
    const filterByPid = (getUserEvents = [], keys = []) => {
      const res = getUserEvents.filter(
        function (item) {
          const thisObj = this;
          return item.participants.some((leg) => {
            return thisObj[leg.id];
          });
        },
        keys.reduce((acc, val) => {
          acc[val] = true;
          return acc;
        }, Object.create(null))
      );
      return res;
    };
    const userEvents = filterByPid(getUserEvents, keys);

    //store events id in Array
    userEvents.map((item) => {
      userEventArray.push(item.id);
    });

    //get user events events
    if (userEventArray.length > 0) {
      const getEvents = await strapi.db.query("api::event.event").findMany({
        fields: [
          "id",
          "participants",
          "event_duration",
          "start_datetime",
          "title",
        ],
        select: [
          "id",
          "participants",
          "event_duration",
          "start_datetime",
          "title",
        ],
        where: { id: userEventArray },
        populate: { category: true },
      });

      if (pid) {
        getEvents.map((item) => {
          //get participants by id in each event
          const { participants } = item;
          var filtered = participants.filter((value) => {
            return value.id == pid;
          });

          const status = filtered[0].attributes.status;
          const attendance = filtered[0].attributes.attendance;
          attributesArray.push({
            id: item.id,
            resource_status: status,
            resource_attendance: attendance,
            event_title: item.title,
            event_duration: item.event_duration,
            event_startTime: item.start_datetime,
          });

          let start = Date.now();
          let testdate = new Date();
          const end = testdate.setMonth(testdate.getMonth() - Number(mid));
          console.log("end date", end);

          const searchedTemplates = attributesArray.filter((d) => {
            const de = new Date(d.event_startTime);
            return de <= start && de >= end;
          });
          newArray = searchedTemplates;
         
        });

        return newArray;
      }
    }
  },
};