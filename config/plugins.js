module.exports = ({ env }) => ({

email: {
    config: {
      provider: 'strapi-provider-email-resend',
      providerOptions: {
        apiKey: "re_UHGpngb8_BgZesJjMmyJJGadi9oES4QWM", // Required
      },
      settings: {
        defaultFrom: 'info@kal.codes',
        defaultReplyTo: 'info@kal.codes',
      },
    }
  }, 

});
