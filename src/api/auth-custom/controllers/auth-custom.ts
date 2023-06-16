/**
 * auth-custom controller
 */

'use strict';



import { factories } from '@strapi/strapi'
import { createHash } from 'node:crypto'

export default factories.createCoreController('api::auth-custom.auth-custom', ({ strapi }) =>  ({

    async register(ctx) {
      // Extract the submitted username and password from the request body
      const reqData = ctx.request.body;

      // Create the corresponding admin user
      const hashedPassword = createHash('md5').update(reqData.password).digest('hex')

      const admin = await strapi.query('admin::user').create({data: {
        username: reqData.username,
        email: reqData.email,
        firstname: reqData.first_name,
        lastname: reqData.last_name,
        password: hashedPassword,
        roles: [3],
        isActive: true,
        provider: 'local'
      // Additional admin user properties can be set here if needed
    }});
  
      // Create the local user
      const user = await strapi.plugins['users-permissions'].services.user.add({
        ...reqData,
        provider: 'local',
        role: 2,
      });
  
      
  
      // Sanitize and send the local user response
      ctx.send((user));
  
      // Log the admin user creation for reference
      console.log('Admin user created:', admin);
    },
  
    
  
    
    
  }));
