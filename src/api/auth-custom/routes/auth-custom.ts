/**
 * auth-custom router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::auth-custom.auth-custom');

module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/auth-custom/register',
        handler: 'auth-custom.register',
        config: {
            auth: false
        }
      }
    ]
  }