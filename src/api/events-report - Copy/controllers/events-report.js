'use strict';

    module.exports = {
      async findAll(ctx, next) {
        try {
          const data = await strapi.service('api::events-report.events-report').eventsReport();
          ctx.body = data;
        } catch (err) {
          ctx.badRequest('Events report controller error', { moreDetails: err })
        }
      }
    };