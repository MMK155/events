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


// const {sanitizeEntity} = require('strapi-utils');
// 'use strict';

//     module.exports = {
      
//       async find(ctx) {
//         let entities;
//         if(ctx.query._q){
//           entities = await strapi.services.event.search(ctx.query);
//         }else{
//           entities = await strapi.services.event.find(ctx.query,[user])
//         }
//         try {
//           const data = await strapi.service('api::events-report.events-report').eventsReport();
//           ctx.body = data;
//         } catch (err) {
//           ctx.badRequest('Events report controller error', { moreDetails: err })
//         }
//       }
//     };