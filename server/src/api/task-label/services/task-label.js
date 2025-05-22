'use strict';

/**
 * task-label service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::task-label.task-label');
