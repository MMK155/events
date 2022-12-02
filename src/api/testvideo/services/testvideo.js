'use strict';

/**
 * testvideo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::testvideo.testvideo');
