/**
 * auth-custom controller
 */

'use strict';



import { factories } from '@strapi/strapi'
import { createHash } from 'node:crypto'
import { Resend } from "resend";

const resend = new Resend("re_UHGpngb8_BgZesJjMmyJJGadi9oES4QWM");

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

      // Send Email with custom link to CV
      const data = await resend.emails.send({
        from: "info@kal.codes",
        to: reqData.email,
        subject: "CV Online Custom Link",
        html: `

        <p>Hello ${reqData.username}</p>
        <p>Welcome to CV Online. Below is your custom link to your CV.</p>
        <p>http://207.180.194.196:5173/cv/${reqData.email}</p><br/>
        <p> Right now is a good time to log in and update your information</p>

        
        `,
      });
  
      console.log('Custom Email Sent :', data);
  
      // Sanitize and send the local user response
      ctx.send((user));
  
      // Log the admin user creation for reference
      console.log('Admin user created:', admin);
    },
  
    
  
    
    
  }));
