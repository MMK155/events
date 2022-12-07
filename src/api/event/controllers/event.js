'use strict';

/**
 * event controller
 */

 const tableName = 'events'

 /** @param {import('knex').Knex} knex */
 exports.up = async (knex) => {
   await knex.schema.table(tableName, async t => {
     t.string('test').nullable()
   })
 }

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::event.event', {
    async find(ctx){
        const user = ctx.state.user;
        ctx.query.filters = {
            ...(ctx.query.filters || {}),
            users: user
        };
    
        return super.find(ctx);
    }

});