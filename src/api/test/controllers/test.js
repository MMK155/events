'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::test.test');
// 'use strict';

// /**
//  * event controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::test.test');
// module.exports = {
//     async index(ctx, next) {
//         const id = ctx.state?.user?.id

//         const account = await strapi
//             .query('api::test.test')
//             .find({
//                 where: { user: id },
//                 populate: {
//                     user: true
//                 }
//             })

//         ctx.body = account
//     },
// };
// module.exports = createCoreController('api::test.test', ({ strapi }) => ({
//     async me(ctx) {
//         try {
//             const user = ctx.state.user;
//             const datas = await strapi.entityService.findMany('api::test.test', {
//                 filters: {
//                     user: {
//                         id: user.id
//                     }
//                 }
//             })
//             return datas;
//         } catch (err) {
//             ctx.body = err;
//         }
//     }
//     }));


'use strict';
module.exports = createCoreController('api::test.test', {

    async find(ctx){
        const user = ctx.state.user;
    
        ctx.query.filters = {
            ...(ctx.query.filters || {}),
            author: user.id

        };
    
        return super.find(ctx);
    }

});