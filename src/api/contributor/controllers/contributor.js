'use strict';

/**
 * contributor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::contributor.contributor', {
    async find(ctx){
        const user = ctx.state.user;
        ctx.query.filters = {
            ...(ctx.query.filters || {}),
            users: user
        };
    
        return super.find(ctx);
    }

});